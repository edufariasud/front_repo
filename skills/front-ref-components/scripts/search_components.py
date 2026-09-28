#!/usr/bin/env python3
"""
Utilitário para listar, buscar e copiar componentes e estilos do projeto
`front_ref_components` para o projeto atual, com Auto-Sync Diário embutido.
"""
import argparse
import json
import shutil
import sys
from datetime import date
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
STATE_FILE = SKILL_DIR / ".catalog_state.json"
SKILL_MD_FILE = SKILL_DIR / "SKILL.md"

CANDIDATE_ROOTS = [
    SKILL_DIR.parent.parent,  # Quando dentro do próprio repositório front_ref_components/skills/front-ref-components
    Path.home() / "Arquivos" / "projetos" / "front_ref_components",
]

AUTO_START_MARKER = "<!-- AUTO-CATALOG-START -->"
AUTO_END_MARKER = "<!-- AUTO-CATALOG-END -->"


def get_source_root() -> Path:
    for root in CANDIDATE_ROOTS:
        if root.exists():
            return root
    print("Erro: Diretório front_ref_components não encontrado.", file=sys.stderr)
    sys.exit(1)


def scan_current_components(src_root: Path) -> list[str]:
    comp_dir = src_root / "src" / "components"
    items = []
    for path in sorted(comp_dir.rglob("*")):
        if path.is_file() and path.suffix in {".tsx", ".ts", ".scss", ".css"}:
            items.append(str(path.relative_to(comp_dir)))
    return items


def update_skill_md_catalog(today_str: str, components: list[str], added: list[str]):
    if not SKILL_MD_FILE.exists():
        return
    content = SKILL_MD_FILE.read_text(encoding="utf-8")
    if AUTO_START_MARKER not in content or AUTO_END_MARKER not in content:
        return

    grouped: dict[str, list[str]] = {}
    for rel in components:
        parts = rel.split("/")
        category = parts[0] if len(parts) > 1 else "root"
        grouped.setdefault(category, []).append(rel)

    lines = [
        AUTO_START_MARKER,
        f"> 🔄 **Última verificação automática do catálogo:** `{today_str}` | **Total de arquivos mapeados:** `{len(components)}`",
    ]
    if added:
        lines.append(f"> ✨ **Novos componentes detectados no último sync:** `{', '.join(added)}`")
    lines.append("")
    for cat, files in sorted(grouped.items()):
        lines.append(f"- **`{cat}/`** ({len(files)} arquivos): " + ", ".join(f"`{f}`" for f in files))
    lines.append(AUTO_END_MARKER)

    before = content.split(AUTO_START_MARKER)[0]
    after = content.split(AUTO_END_MARKER)[1]
    SKILL_MD_FILE.write_text(before + "\n".join(lines) + after, encoding="utf-8")


def ensure_daily_sync(src_root: Path, force: bool = False):
    today_str = date.today().isoformat()
    state = {}
    if STATE_FILE.exists():
        try:
            state = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except Exception:
            state = {}

    last_checked = state.get("last_checked_date")
    if not force and last_checked == today_str:
        return

    current_components = scan_current_components(src_root)
    previous_components = set(state.get("components", []))
    current_set = set(current_components)

    added = sorted(current_set - previous_components) if previous_components else []
    removed = sorted(previous_components - current_set) if previous_components else []

    new_state = {
        "last_checked_date": today_str,
        "total_count": len(current_components),
        "last_added": added,
        "last_removed": removed,
        "components": current_components,
    }
    STATE_FILE.write_text(json.dumps(new_state, indent=2, ensure_ascii=False), encoding="utf-8")
    update_skill_md_catalog(today_str, current_components, added)

    print(f"🔄 [Auto-Sync Diário {today_str}] Catálogo de front_ref_components verificado ({len(current_components)} arquivos).")
    if added:
        print(f"✨ Novos componentes adicionados ({len(added)}): {', '.join(added)}")
    if removed:
        print(f"🗑️ Componentes removidos ({len(removed)}): {', '.join(removed)}")
    if not added and not removed:
        print("✅ Nenhum componente novo desde a última verificação.")
    print("-" * 60)


def list_all_components(src_root: Path):
    comp_dir = src_root / "src" / "components"
    print(f"=== Componentes em {comp_dir} ===")
    for rel in scan_current_components(src_root):
        print(f"  - {rel}")


def search_components(src_root: Path, query: str):
    comp_dir = src_root / "src" / "components"
    q = query.lower()
    matches = []
    for path in sorted(comp_dir.rglob("*")):
        if path.is_file() and path.suffix in {".tsx", ".ts", ".scss"}:
            rel_str = str(path.relative_to(comp_dir))
            if q in rel_str.lower():
                matches.append((rel_str, "nome do arquivo"))
                continue
            try:
                content = path.read_text(encoding="utf-8", errors="ignore")
                if q in content.lower():
                    matches.append((rel_str, "conteúdo"))
            except Exception:
                pass

    if not matches:
        print(f"Nenhum componente encontrado para '{query}'.")
        return

    print(f"=== Resultados para '{query}' ({len(matches)}) ===")
    for rel_str, match_type in matches:
        print(f"  - {rel_str}  [match: {match_type}]")


def copy_component(src_root: Path, rel_path: str, dest_dir: str):
    comp_dir = src_root / "src" / "components"
    target_source = comp_dir / rel_path
    if not target_source.exists():
        print(f"Erro: '{target_source}' não encontrado.", file=sys.stderr)
        sys.exit(1)

    dest = Path(dest_dir)
    if target_source.is_dir():
        dest_target = dest / target_source.name
        shutil.copytree(target_source, dest_target, dirs_exist_ok=True)
        print(f"Diretório copiado para: {dest_target}")
    else:
        dest.mkdir(parents=True, exist_ok=True)
        shutil.copy2(target_source, dest / target_source.name)
        print(f"Arquivo copiado para: {dest / target_source.name}")
        scss_companion = target_source.with_suffix(".module.scss")
        if scss_companion.exists():
            shutil.copy2(scss_companion, dest / scss_companion.name)
            print(f"Estilo acompanhante copiado para: {dest / scss_companion.name}")


def copy_styles(src_root: Path, dest_dir: str):
    styles_dir = src_root / "src" / "styles"
    dest = Path(dest_dir)
    shutil.copytree(styles_dir, dest, dirs_exist_ok=True)
    print(f"Estrutura completa de estilos SCSS copiada para: {dest}")


def main():
    parser = argparse.ArgumentParser(description="Busca e copia componentes de front_ref_components (com Auto-Sync Diário).")
    parser.add_argument("--sync", action="store_true", help="Força a verificação e atualização imediata do catálogo de componentes.")
    parser.add_argument("--list", action="store_true", help="Lista todos os componentes disponíveis.")
    parser.add_argument("--search", type=str, help="Busca componentes por palavra-chave no nome ou código.")
    parser.add_argument("--copy", type=str, help="Caminho relativo em src/components para copiar (ex: ui/SpotlightCard.tsx ou showcase/pricing).")
    parser.add_argument("--copy-styles", action="store_true", help="Copia toda a pasta src/styles (SCSS + DaisyUI + tokens).")
    parser.add_argument("--dest", type=str, default="src/components", help="Diretório de destino para --copy ou --copy-styles.")
    args = parser.parse_args()

    src_root = get_source_root()
    # Sempre executa a verificação diária (1x por dia automaticamente, ou imediato se --sync)
    ensure_daily_sync(src_root, force=args.sync)

    if args.list:
        list_all_components(src_root)
    elif args.search:
        search_components(src_root, args.search)
    elif args.copy:
        copy_component(src_root, args.copy, args.dest)
    elif args.copy_styles:
        copy_styles(src_root, args.dest)
    elif not args.sync:
        parser.print_help()


if __name__ == "__main__":
    main()
