```
poem-journal-next
├─ .eslintrc.json
├─ .git
├─ .gitignore
├─ a.html
├─ global.d.ts
├─ next.config.mjs
├─ package.json
├─ pages
│  └─ api
│     └─ auth
│        └─ [...nextauth].ts
├─ parsedTestPoem.ts
├─ public
│  ├─ background.jpg
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ src
│  └─ app
│     ├─ api
│     │  ├─ mongodb
│     │  │  └─ route.ts
│     │  └─ poems
│     │     ├─ route.ts
│     │     ├─ user
│     │     │  └─ [userId]
│     │     │     └─ route.ts
│     │     └─ [id]
│     │        └─ route.ts
│     ├─ auth
│     │  └─ page.tsx
│     ├─ favicon.ico
│     ├─ globals.css
│     ├─ layout.tsx
│     ├─ layoutMetadata.ts
│     ├─ Navigation
│     │  └─ NavBar.tsx
│     ├─ page.module.css
│     ├─ page.tsx
│     ├─ poem
│     │  └─ [id]
│     │     ├─ annotate
│     │     │  └─ page.tsx
│     │     └─ page.tsx
│     ├─ poem-edit
│     │  └─ [id]
│     │     └─ page.tsx
│     ├─ poem-upload
│     │  └─ page.tsx
│     ├─ poems
│     ├─ test
│     │  └─ page.tsx
│     ├─ user
│     │  └─ page.tsx
│     ├─ _components
│     │  ├─ Auth
│     │  │  ├─ Error.tsx
│     │  │  ├─ SignIn.tsx
│     │  │  └─ SignUp.tsx
│     │  ├─ ClientProviders
│     │  │  └─ ClientProviders.tsx
│     │  ├─ CustomComponents
│     │  │  └─ CustomComponents.tsx
│     │  ├─ Poem
│     │  │  ├─ Line
│     │  │  │  └─ Line.tsx
│     │  │  ├─ Poem.tsx
│     │  │  └─ Stanza
│     │  │     └─ Stanza.tsx
│     │  ├─ PoemEditForm
│     │  │  └─ PoemEditForm.tsx
│     │  ├─ PoemForm
│     │  │  └─ PoemForm.tsx
│     │  ├─ ProtectedRoute
│     │  │  └─ ProtectedRoute.tsx
│     │  ├─ TextEditor
│     │  │  ├─ subcomponents
│     │  │  │  ├─ EditorLine
│     │  │  │  │  └─ EditorLine.tsx
│     │  │  │  ├─ EditorParagraph
│     │  │  │  │  └─ EditorParagraph.tsx
│     │  │  │  ├─ EditorStanza
│     │  │  │  │  └─ EditorStanza.tsx
│     │  │  │  └─ FormattingButton
│     │  │  │     └─ FormattingButton.tsx
│     │  │  └─ TextEditor.tsx
│     │  └─ User
│     │     ├─ Poem-Title-Card
│     │     │  └─ Poem-Title-Card.tsx
│     │     ├─ Poem-XL-Card
│     │     ├─ Poems-List
│     │     │  └─ PoemsList.tsx
│     │     └─ User-Top-Hub
│     │        └─ UserTopHub.tsx
│     ├─ _contexts
│     │  ├─ Editor.context.tsx
│     │  ├─ Theme.context.tsx
│     │  ├─ User.context.tsx
│     │  └─ UserPoems.context.tsx
│     ├─ _hooks
│     │  └─ useEditor.tsx
│     ├─ _models
│     ├─ _theme
│     │  └─ theme.ts
│     ├─ _types
│     │  └─ Types.ts
│     └─ _utils
│        ├─ CustomEditor.ts
│        ├─ editorRenderUtils.tsx
│        ├─ mongodb.ts
│        ├─ parseContentToStanzas.ts
│        ├─ parseStanzasToContent.ts
│        └─ typeGuards.ts
├─ tsconfig.json
└─ yarn.lock

```
