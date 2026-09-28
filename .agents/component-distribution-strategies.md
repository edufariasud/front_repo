# Estratégias de Propagação e Distribuição de Componentes para Vercel

Documento de referência para quando decidirmos propagar e compartilhar os componentes desenvolvidos em `front_ref_components` com outros webapps hospedados na Vercel.

---

## 1. Cenário A: Monorepo com Turborepo (Recomendado pela Vercel)

A Vercel é a criadora e mantenedora oficial do Turborepo. É a arquitetura mais limpa e com menor atrito operacional quando você é o proprietário de todos os projetos.

### Estrutura de Pastas
```text
meu-ecossistema/
├── apps/
│   ├── web-app1/              # Next.js App Router (Vercel Project 1)
│   ├── web-app2/              # Next.js App Router (Vercel Project 2)
│   └── front_ref_components/  # Showcase / Catálogo de Componentes
├── packages/
│   ├── ui/                    # Biblioteca compartilhada de componentes (DaisyUI + Aceternity)
│   │   ├── src/
│   │   │   ├── navbar/
│   │   │   ├── buttons/
│   │   │   └── index.ts
│   │   └── package.json
│   └── config/                # Tailwind v4 / DaisyUI theme tokens compartilhados
├── package.json
└── turbo.json
```

### Como Funciona na Vercel
1. **Conexão:** Você conecta o mesmo repositório Git aos múltiplos projetos no painel da Vercel.
2. **Root Directory:** Em cada projeto Vercel (*Settings > General > Root Directory*), define-se a pasta do app correspondente (ex: `apps/web-app1`).
3. **Deploy Inteligente:**
   * Toda vez que você fizer `git push`:
   * A Vercel detecta quais apps dependem de `packages/ui`.
   * Dispara o build e deploy automático em paralelo de **todos os webapps afetados**.
4. **Vantagens:**
   * Sem necessidade de publicar pacotes no NPM.
   * Sem chaves/tokens de API intermediários.
   * Hot-reload local instantâneo em múltiplos apps ao mesmo tempo.

---

## 2. Cenário B: Repositórios Separados no GitHub + NPM / Deploy Hooks

Ideal caso prefira manter cada webapp em seu próprio repositório Git independente.

### Estrutura do Fluxo
```text
[front_ref_components (Git)]
       │
       ▼ (npm publish / GitHub Packages)
[@sua-org/ui-components]
       │
       ├──► WebApp 1 (Vercel) ──┐
       │                        ├─► Atualizados via Vercel Deploy Hooks
       └──► WebApp 2 (Vercel) ──┘
```

### Passo a Passo de Implementação
1. **Compilação da Biblioteca:**
   * Configurar `tsup` ou modo biblioteca para exportar componentes com tipagem `.d.ts`.
   * Publicar como pacote privado no GitHub Packages ou pacote NPM.
2. **Nos outros Webapps:**
   * Adicionar dependência no `package.json`:
     ```json
     "dependencies": {
       "@sua-org/ui-components": "^1.0.0"
     }
     ```
3. **Automação de Deploy na Vercel:**
   * Em cada webapp na Vercel (*Settings > Git > Deploy Hooks*), criar um hook de deploy.
   * No repositório de componentes, criar uma automação (GitHub Action / script de release):
     * Ao publicar versão nova, dispara requisição `POST` para os Deploy Hooks dos apps na Vercel.
     * A Vercel reconstrói e publica os outros apps com os novos componentes automaticamente.

---

## 3. Checklist de Decisão para a Implementação

Quando formos implementar, decidir entre:
- [ ] **Opção A (Monorepo Turborepo)**: Se quisermos centralizar os projetos e ter sincronização instantânea sem publicar pacotes.
- [ ] **Opção B (Pacote NPM + Deploy Hooks)**: Se quisermos manter os repositórios isolados com versionamento semântico explícito (`v1.1.0`, etc.).
