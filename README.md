# Minha Jornada Fértil · Dra. Laís Heiss

Landing page do curso **Minha Jornada Fértil**, com a nutricionista Laís Hess.
Design de origem: Figma "Site: Dra. Lais Heiss" (desktop 1440 e mobile 390).

## Stack

- [Astro](https://astro.build) (site estático, sem framework de UI)
- GSAP + ScrollTrigger para o motion de rolagem
- Fontes self-hosted: Dunbar Tall (licença web CJ Type) e Caveat (SIL OFL)

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera /dist
```

## Estrutura

```
src/
  styles/tokens.css      tokens do Figma (cores, espaçamentos, raios, tipografia desktop/mobile)
  styles/global.css      base + componentes compartilhados (botões, eyebrow, chips, brilhos…)
  data/site.ts           links (checkout, redes sociais) e CRN  ← editar aqui
  data/icons.ts          ícones exportados do Figma
  components/            Icon, Badge (Icon Badge), Star (Brilho), Button, Eyebrow, Header…
  components/sections/   um arquivo por bloco da página
  scripts/motion.ts      interações e animações
public/
  fonts/  img/  logo.svg  heart.svg
```

## Publicar (Vercel)

1. Entrar em vercel.com com a conta do GitHub.
2. "Add New → Project" e importar este repositório. A Vercel detecta o Astro sozinha.
3. Em "Domains", apontar o domínio do curso.

## Pendências de conteúdo

- [ ] Link do checkout da Hotmart (`src/data/site.ts → checkout`)
- [ ] Perfis da Laís: Instagram, YouTube, TikTok, WhatsApp (`src/data/site.ts → social`)
- [ ] Número do CRN (`src/data/site.ts → crn`)
- [ ] Títulos das aulas dos módulos 2 a 7 (`src/components/sections/Curso.astro`)
- [ ] Depoimentos reais (`src/components/sections/Autoridade.astro`)
- [ ] Domínio definitivo (`astro.config.mjs → site`)
