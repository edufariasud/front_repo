---
name: 21st-dev
description: Unified skill for 21st.dev component catalog and UI workflow. Use to search, explore, pull, install, build, and review React/Tailwind/shadcn/Aceternity UI components using the 21st CLI (`@21st-dev/cli`). Covers exploring 3 visual directions, CLI catalog search/get/add with API key pool rotation, DaisyUI/Tailwind v4 integration, and design QA review.
---

# 21st.dev — Catálogo & Fluxo Completo de UI

Guia consolidado para busca, inspeção, download, geração e refinamento de componentes e referências visuais do ecossistema [21st.dev](https://21st.dev).

---

## 1. Autenticação e Pool de Chaves de API

A CLI oficial (`@21st-dev/cli`) aceita autenticação via login interativo ou chave de API:
- **Login interativo**: `npx @21st-dev/cli login` (salva token local em `~/.config/21st/auth.json`).
- **Chave de API**: Passada via parâmetro `--api-key <key>` ou variável de ambiente `TWENTYFIRST_TOKEN`.

### Rotação Automática de Chaves (Multiplicação de Cota Free)
- O pool de chaves ativas está configurado em: `~/.gemini/config/skills/21st-dev/keys.json`.
- Cada conta gratuita tem direito a **2 downloads de código por dia** (totalizando **14 downloads/dia** com as 7 contas no pool).
- Verificar o saldo restante de cada chave com:
  ```bash
  npx @21st-dev/cli usage --api-key <chave>
  ```
- Quando uma chave atingir o limite diário de 2/2, alternar automaticamente para a próxima chave do pool (`keys.json`) para continuar baixando sem interrupção.
- A chave primária ativa no sistema fica em `~/.config/21st/auth.json`.

---

## 2. Busca e Download no Catálogo (Find & Pull)

Sempre realize a busca e visualização prévia antes de gastar um download da cota diária:

```bash
# 1. Buscar componentes gratuitos por palavra-chave (sem gastar cota de download)
npx @21st-dev/cli search "liquid button" --free --limit 5 --json

# 2. Buscar marcas e logos oficiais em SVG (100% gratuito e ilimitado)
npx @21st-dev/cli logo "supabase" --json

# 3. Inspecionar o código de um componente antes de instalar
npx @21st-dev/cli get <id> --api-key <chave>

# 4. Instalar componente diretamente no projeto (padrão shadcn)
npx @21st-dev/cli add <autor>/<slug> --api-key <chave>
```

> **Dica de Ouro:** A busca (`search`) e os metadados são gratuitos e ilimitados. Use o navegador do agente para abrir a URL de preview do componente e inspecionar visualmente via screenshot antes de chamar `21st get` ou `21st add`.

### Regra Mandatória: Cofre Local Permanente (`downloads/`)
Toda vez que um componente for baixado via `21st get` ou `21st add`, salvar **imediatamente uma cópia permanente do código original** dentro da pasta da skill:
`~/.gemini/config/skills/21st-dev/downloads/<categoria>/<nome-do-componente>/`

Cada pasta no cofre deve conter:
- `original.tsx`: O código-fonte bruto original fornecido pelo autor.
- `metadata.json`: Metadados do item (ID, autor, tags, data do download, cota usada).
- `demo.tsx` (quando fornecido): O código de exemplo/demo de uso.

**Vantagens da regra:**
1. **Nunca gastar cota em dobro**: Antes de chamar a API para baixar, checar sempre se o componente já foi baixado no cofre local `downloads/`.
2. **Biblioteca Pessoal Vitalícia**: Seus componentes baixados ficam arquivados para sempre na sua máquina, prontos para serem usados em qualquer outro projeto sem gastar requisições.

---

## 3. Fluxo de Exploração Visual (Explore)

Quando o usuário pedir para criar uma tela ou componente sem uma direção visual pré-definida:
1. Pesquise no catálogo do 21st por termos relacionados ao tema.
2. Defina **3 direções visuais genuinamente diferentes** (variando hierarquia, densidade de informação e efeitos, e não apenas trocando cores).
3. Apresente as 3 opções com links de preview, pontos fortes e prós/contras.
4. Aguarde a escolha do usuário antes de iniciar o código final.

---

## 4. Construção e Adaptação à Stack Real (Build)

Componentes do 21st vêm geralmente formatados para o ecossistema shadcn/Tailwind v3. Ao importar para o projeto:
1. **Adaptação para DaisyUI v5 & Tailwind v4**:
   - Substitua cores hardcoded (`bg-zinc-900`, `text-blue-500`) pelos tokens semânticos do projeto (`bg-base-100`, `bg-base-200`, `text-primary`, etc.).
   - Integre com os temas ativos (ex: Dark Bumblebee, Sunset, Vampire).
2. **Tratamento de Estados Reais**:
   - Não crie apenas o estado estático; implemente estado de carregamento (*skeleton/spinner*), estado vazio (*empty state*) e tratamento de erros.
3. **Responsividade**:
   - Assegure comportamento perfeito em mobile (< 640px) e desktop (> 1024px).

---

## 5. Revisão e Auditoria de Qualidade (Review)

Após a implementação, realize uma auditoria de entrega:
- **Acessibilidade**: Elementos interativos possuem `aria-label`, foco visível (`focus-visible`) e navegação completa por teclado (`Tab`, `Enter`, `Escape`).
- **Contraste**: Verifique legibilidade tanto no tema claro quanto no tema escuro.
- **Limpeza**: Remova dependências ou arquivos temporários não utilizados.
