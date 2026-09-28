---
name: front-ref-components
description: >
  Busca, inspeciona, importa e adapta componentes, showcases, layouts, temas DaisyUI 5 e arquitetura SCSS do acervo central `front_ref_components`.
  Inclui protocolo obrigatório de Auto-Sync Diário (1x por dia) para detectar novos componentes adicionados ao repositório.
  Use sempre que for construir interfaces, páginas, dashboards, navbars, formulários de login, cards, gráficos, tabelas ou heros visuais no projeto.
---

# Catálogo & Integração: `front_ref_components`

Esta skill conecta o projeto diretamente ao repositório de referência visual e de componentes do Criador:
**Caminho Base:** `/run/media/liveuser/1e81fc6b-9460-4560-9706-a416cb37dbfe/@home/eduardo/Arquivos/projetos/front_ref_components` (ou `/home/eduardo/Arquivos/projetos/front_ref_components`).

Antes de criar qualquer componente de UI do zero, **consulte obrigatoriamente este acervo** para reaproveitar componentes já validados, estilizados com Tailwind v4 + DaisyUI 5 + SCSS e adaptáveis a múltiplos temas.

---

## 🔄 0. Protocolo de Verificação Diária (Auto-Sync 1x por Dia)

> 🚨 **REGRA DE OURO AO ACIONAR ESTA SKILL:**
> Sempre que esta skill for usada, o script `search_components.py` verifica automaticamente o arquivo `.catalog_state.json` para checar se o catálogo já foi atualizado na data de hoje (`YYYY-MM-DD`).
> - **Se ainda NÃO foi verificado hoje:** O próprio script varre `front_ref_components/src/components`, detecta qualquer componente novo ou removido, atualiza o `.catalog_state.json` e reescreve o bloco de inventário dinâmico neste `SKILL.md` automaticamente!
> - **Se já foi verificado hoje:** Executa em 0ms sem re-escanear à toa.
> - **Se o usuário avisar que acabou de criar um componente novo no mesmo dia:** Rode `python3 .agents/skills/front-ref-components/scripts/search_components.py --sync` para forçar a atualização imediata.

---

## 1. Mapa Principal de Componentes por Categoria

### A. Layout & Navegação (`src/components/layout/`)
| Componente | Arquivo | Descrição |
| :--- | :--- | :--- |
| **SideNav** | `src/components/layout/SideNav.tsx` | Menu lateral responsivo (desktop + mobile drawer) com suporte a seções agrupadas, badges, avatar de usuário, cores customizadas e adaptação automática aos temas do DaisyUI. |
| **ShowcaseHeader** | `src/components/layout/ShowcaseHeader.tsx` | Header superior com seletor de temas, busca e ações rápidas. |
| **ScrollableTabsNav** | `src/components/layout/ScrollableTabsNav.tsx` | Navegação em abas horizontais roláveis com indicador ativo suave. |

### B. Autenticação (`src/components/auth/`)
| Componente | Arquivo | Descrição |
| :--- | :--- | :--- |
| **LoginForm** | `src/components/auth/LoginForm.tsx` | Tela de login/autenticação completa com suporte a troca de tema em tempo real e validação. |

### C. Dashboard & Gestão (`src/components/dashboard/`)
| Componente | Arquivo | Descrição |
| :--- | :--- | :--- |
| **DashboardView** | `src/components/dashboard/DashboardView.tsx` | Estrutura completa de painel administrativo integrando SideNav, KPIs, gráficos e tabelas. |
| **StatsCard** | `src/components/dashboard/StatsCard.tsx` | Cards de métricas/KPIs com variação percentual, ícones e indicadores de tendência. |
| **ChartsSection** | `src/components/dashboard/ChartsSection.tsx` | Seção de gráficos de desempenho e visualização de dados. |
| **DataTable** | `src/components/dashboard/DataTable.tsx` | Tabela de dados rica com paginação, busca, filtros e badges de status. |
| **AppsLauncher** | `src/components/dashboard/AppsLauncher.tsx` | Menu estilo grid launcher para alternar entre módulos/apps do ecossistema. |
| **QuickActions** | `src/components/dashboard/QuickActions.tsx` | Barra/card de ações rápidas para fluxos frequentes. |
| **ThemeSwitcher** | `src/components/dashboard/ThemeSwitcher.tsx` | Seletor completo dos temas oficiais DaisyUI + temas customizados (`DAISY_THEMES`). |
| **ToastContainer** | `src/components/dashboard/ToastContainer.tsx` | Sistema de notificações toast flutuantes. |
| **UserMenu** | `src/components/dashboard/UserMenu.tsx` | Dropdown de perfil de usuário, configurações e logout. |

### D. E-Commerce & Catálogo (`src/components/ecommerce/`)
| Componente | Arquivo | Descrição |
| :--- | :--- | :--- |
| **MerchantCatalog** | `src/components/ecommerce/MerchantCatalog.tsx` | Catálogo de produtos/serviços com filtros, busca e cards de itens. |

### E. UI Premium & Efeitos Especiais (`src/components/ui/`)
| Componente | Arquivo | Descrição |
| :--- | :--- | :--- |
| **HorizonHeroSection** | `src/components/ui/horizon-hero-section.tsx` (+ `.module.scss`) | Hero section cinematográfica de alto impacto visual. |
| **QuordixHero** | `src/components/ui/quordix-hero.tsx` (+ `.module.scss`) | Hero section moderna estilo SaaS com efeitos de luz e grid. |
| **WebGLShader** | `src/components/ui/web-gl-shader.tsx` | Background interativo com shader WebGL de alta performance. |
| **LiquidGlassButton** | `src/components/ui/liquid-glass-button.tsx` | Botão com efeito vidro líquido (glassmorphism avançado). |
| **ShimmerButton** | `src/components/ui/ShimmerButton.tsx` | Botão de destaque com feixe de brilho animado. |
| **BorderBeam** | `src/components/ui/BorderBeam.tsx` | Borda iluminada animada que percorre o perímetro de cards/containers. |
| **SpotlightCard** | `src/components/ui/SpotlightCard.tsx` | Card interativo com foco de luz radial que segue o cursor do mouse. |
| **Meteors** | `src/components/ui/Meteors.tsx` | Efeito visual de chuva de meteoros no background de cards/seções. |
| **Marquee** | `src/components/ui/Marquee.tsx` | Carrossel contínuo infinito (horizontal/vertical) para logos, depoimentos ou avisos. |
| **BeUiExpandableTabs** | `src/components/ui/be-ui-expandable-tabs.tsx` | Abas expansíveis animadas com ícones. |
| **MarketingActivitiesCard** | `src/components/ui/MarketingActivitiesCard.tsx` | Card avançado de acompanhamento de campanhas e atividades. |
| **ProjectProgressCard** | `src/components/ui/ProjectProgressCard.tsx` | Card de progresso de projetos com barra de conclusão, equipe e prazos. |
| **TitleHeader** | `src/components/ui/TitleHeader.tsx` | Cabeçalho padronizado de seção com subtítulo e badge. |

### F. Inventário Dinâmico Auto-Sincronizado
<!-- AUTO-CATALOG-START -->
> 🔄 **Última verificação automática do catálogo:** `2026-09-28` | **Total de arquivos mapeados:** `70`
> ✨ **Novos componentes detectados no último sync:** `showcase/neon-buttons/page.tsx, ui/NeonButton.tsx`

- **`auth/`** (1 arquivos): `auth/LoginForm.tsx`
- **`dashboard/`** (9 arquivos): `dashboard/AppsLauncher.tsx`, `dashboard/ChartsSection.tsx`, `dashboard/DashboardView.tsx`, `dashboard/DataTable.tsx`, `dashboard/QuickActions.tsx`, `dashboard/StatsCard.tsx`, `dashboard/ThemeSwitcher.tsx`, `dashboard/ToastContainer.tsx`, `dashboard/UserMenu.tsx`
- **`ecommerce/`** (1 arquivos): `ecommerce/MerchantCatalog.tsx`
- **`layout/`** (4 arquivos): `layout/ScrollableTabsNav.tsx`, `layout/ShowcaseHeader.tsx`, `layout/SideNav.tsx`, `layout/index.ts`
- **`showcase/`** (38 arquivos): `showcase/be-ui-expandable-tabs/page.tsx`, `showcase/border-beam/page.tsx`, `showcase/charts/page.tsx`, `showcase/charts/styles.module.scss`, `showcase/evervault/page.tsx`, `showcase/evervault/styles.module.scss`, `showcase/faq/page.tsx`, `showcase/faq/styles.module.scss`, `showcase/horizon-hero/page.tsx`, `showcase/marketing-activities/page.tsx`, `showcase/merchant-catalog/page.tsx`, `showcase/meteors-marquee/page.tsx`, `showcase/neon-buttons/page.tsx`, `showcase/notifications/page.tsx`, `showcase/notifications/styles.module.scss`, `showcase/pointer-highlight/page.tsx`, `showcase/pointer-highlight/styles.module.scss`, `showcase/pricing/page.tsx`, `showcase/pricing/styles.module.scss`, `showcase/product-card/page.tsx`, `showcase/product-card/styles.module.scss`, `showcase/profile/page.tsx`, `showcase/profile/styles.module.scss`, `showcase/project-cards/page.tsx`, `showcase/quordix-hero/page.tsx`, `showcase/resizable-navbar/page.tsx`, `showcase/resizable-navbar/styles.module.scss`, `showcase/side-nav/page.tsx`, `showcase/spotlight-shimmer/page.tsx`, `showcase/stats/page.tsx`, `showcase/stats/styles.module.scss`, `showcase/stepper/page.tsx`, `showcase/stepper/styles.module.scss`, `showcase/table/page.tsx`, `showcase/table/styles.module.scss`, `showcase/upload/page.tsx`, `showcase/upload/styles.module.scss`, `showcase/webgl-shader/page.tsx`
- **`ui/`** (17 arquivos): `ui/AppsLauncher.tsx`, `ui/BorderBeam.tsx`, `ui/MarketingActivitiesCard.tsx`, `ui/Marquee.tsx`, `ui/Meteors.tsx`, `ui/NeonButton.tsx`, `ui/ProjectProgressCard.tsx`, `ui/ShimmerButton.tsx`, `ui/SpotlightCard.tsx`, `ui/TitleHeader.tsx`, `ui/be-ui-expandable-tabs.tsx`, `ui/horizon-hero-section.module.scss`, `ui/horizon-hero-section.tsx`, `ui/liquid-glass-button.tsx`, `ui/quordix-hero.module.scss`, `ui/quordix-hero.tsx`, `ui/web-gl-shader.tsx`
<!-- AUTO-CATALOG-END -->

---

## 2. Arquitetura de Estilos & Temas (`src/styles/`)

O `front_ref_components` utiliza **Tailwind CSS v4 + DaisyUI 5 (pré-compilado) + Sass (`.scss`)** para garantir que a extração de estilos nunca quebre os seletores `[data-theme="..."]`:

- **`src/styles/main.scss`**: Ponto de entrada principal. Importa primeiro os `@use` (`tokens`, `components/button`, `components/card`, `components/badge`, `components/input`, `utilities`) e depois os `@import` do DaisyUI (`daisyui/daisyui.css`, temas oficiais e temas customizados `themes/dark-bumblebee` e `themes/vampire`).
- **`src/styles/tokens/`**: `_colors.scss`, `_typography.scss`, `_spacing.scss`, `_index.scss`.
- **`src/styles/components/`**: `_button.scss`, `_card.scss`, `_badge.scss`, `_input.scss`.

> ⚠️ **Regra Crítica de Sass + DaisyUI 5:**
> Sempre coloque todas as diretivas `@use` no topo do `main.scss` **ANTES** de qualquer `@import` do DaisyUI.

---

## 3. Como Buscar, Sincronizar e Copiar Componentes (Script Utilitário)

Qualquer comando abaixo já dispara automaticamente o **Auto-Sync Diário** se a skill ainda não tiver sido verificada na data de hoje:

```bash
# Forçar sincronização manual (caso tenha criado um componente novo hoje mesmo)
python3 .agents/skills/front-ref-components/scripts/search_components.py --sync

# Listar todos os componentes disponíveis no front_ref_components
python3 .agents/skills/front-ref-components/scripts/search_components.py --list

# Buscar componentes por termo (ex: hero, nav, table, card, chart)
python3 .agents/skills/front-ref-components/scripts/search_components.py --search "hero"

# Copiar um componente (e seu .module.scss se existir) para o projeto atual
python3 .agents/skills/front-ref-components/scripts/search_components.py --copy "ui/SpotlightCard.tsx" --dest "src/components/ui/"

# Copiar toda a base de estilos SCSS (tokens, themes, components, main.scss)
python3 .agents/skills/front-ref-components/scripts/search_components.py --copy-styles --dest "src/styles/"
```

---

## 4. Passo a Passo ao Usar um Componente no Projeto

1. **Rode a Busca (com Auto-Sync Diário):** Execute `search_components.py --search <termo>` ou consulte o inventário acima.
2. **Inspecione o Código Fonte:** Use `view_file` no arquivo dentro de `front_ref_components/src/components/...` para entender as `props` e dependências.
3. **Copie ou Importe:** Use `--copy` para trazer o `.tsx` e o `.module.scss` correspondente.
4. **Adapte os Dados para o Domínio/Supabase:** Conecte as props do componente às queries e Server Actions do projeto.

### 🔒 Versionamento Git Automático (MANDATÓRIO)
Sempre que esta skill for executada, auto-fichada, gerar dados ou tiver seus arquivos/scripts alterados, execute obrigatoriamente o commit semântico no repositório correspondente no mesmo turno:
```bash
git add . && git commit -m "tipo(front-ref-components): descrição concisa da alteração"
```
