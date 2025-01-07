```
poem-journal-next
├─ .eslintrc.json
├─ .git
├─ .gitignore
├─ a.html
├─ global.d.ts
├─ next.config.mjs
├─ package.json
├─ parsedTestPoem.ts
├─ public
│  ├─ background.jpg
│  ├─ Master_Tree2.svg
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ animation
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth]
│  │  │  │     └─ route.ts
│  │  │  ├─ mongodb
│  │  │  │  └─ route.ts
│  │  │  ├─ poems
│  │  │  │  ├─ route.ts
│  │  │  │  ├─ user
│  │  │  │  │  └─ [userId]
│  │  │  │  │     └─ route.ts
│  │  │  │  └─ [id]
│  │  │  │     └─ route.ts
│  │  │  └─ user
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ layoutMetadata.ts
│  │  ├─ page.module.css
│  │  ├─ page.tsx
│  │  ├─ poem
│  │  │  ├─ upload
│  │  │  │  └─ page.tsx
│  │  │  └─ [id]
│  │  │     ├─ annotate
│  │  │     │  └─ page.tsx
│  │  │     ├─ edit
│  │  │     │  └─ page.tsx
│  │  │     └─ page.tsx
│  │  ├─ test
│  │  │  └─ page.tsx
│  │  ├─ user
│  │  │  └─ page.tsx
│  │  └─ _utils
│  │     └─ mongodb.ts
│  └─ features
│     ├─ auth
│     │  ├─ Auth.tsx
│     │  └─ components
│     │     ├─ Error
│     │     │  └─ Error.tsx
│     │     ├─ SignIn
│     │     │  └─ SignIn.tsx
│     │     └─ SignUp
│     │        └─ SignUp.tsx
│     ├─ editor
│     │  ├─ components
│     │  │  ├─ controls
│     │  │  │  └─ FormattingButton.tsx
│     │  │  ├─ Editor.tsx
│     │  │  └─ elements
│     │  │     ├─ Line.tsx
│     │  │     ├─ Paragraph.tsx
│     │  │     └─ Stanza.tsx
│     │  ├─ context
│     │  │  └─ EditorContext.tsx
│     │  ├─ editorTypes.ts
│     │  ├─ hooks
│     │  │  └─ useEditor.tsx
│     │  └─ utils
│     │     ├─ CustomEditor.ts
│     │     ├─ editorRenderUtils.tsx
│     │     ├─ parseContentToStanzas.ts
│     │     ├─ parseStanzasToContent.ts
│     │     └─ typeGuards.ts
│     ├─ poem
│     │  ├─ components
│     │  │  ├─ elements
│     │  │  │  ├─ Line
│     │  │  │  │  └─ Line.tsx
│     │  │  │  └─ Stanza
│     │  │  │     └─ Stanza.tsx
│     │  │  ├─ forms
│     │  │  │  ├─ PoemEditForm
│     │  │  │  │  └─ PoemEditForm.tsx
│     │  │  │  └─ PoemForm
│     │  │  │     └─ PoemForm.tsx
│     │  │  └─ Poem.tsx
│     │  ├─ context
│     │  │  └─ UserPoemsContext.tsx
│     │  └─ poemTypes.ts
│     ├─ shared
│     │  ├─ components
│     │  │  ├─ ClientProviders
│     │  │  │  └─ ClientProviders.tsx
│     │  │  ├─ CustomComponents
│     │  │  │  └─ CustomComponents.tsx
│     │  │  ├─ Navigation
│     │  │  │  └─ NavBar.tsx
│     │  │  └─ ProtectedRoute
│     │  │     └─ ProtectedRoute.tsx
│     │  └─ utils
│     ├─ theme
│     │  ├─ components
│     │  ├─ context
│     │  │  └─ ThemeContext.tsx
│     │  └─ theme
│     │     └─ theme.ts
│     ├─ tree-animation
│     │  ├─ AnimationContainer.tsx
│     │  ├─ components
│     │  │  ├─ ClientProviders.tsx
│     │  │  ├─ NavBar
│     │  │  ├─ SpecialBox.tsx
│     │  │  └─ TreeAnimation.tsx
│     │  ├─ constants
│     │  │  └─ groupSelectors.ts
│     │  ├─ contexts
│     │  │  └─ SeasonContext.tsx
│     │  └─ hooks
│     │     ├─ birdsMovementAnimation.ts
│     │     ├─ bootAnimation
│     │     │  ├─ birdsAnimation.ts
│     │     │  ├─ floatingLeavesAnimation.ts
│     │     │  ├─ flowersAnimation.ts
│     │     │  ├─ leavesAnimation.ts
│     │     │  ├─ snowPlopsAnimation.ts
│     │     │  └─ trunkBranchesAnimation.ts
│     │     ├─ loopAnimation
│     │     └─ winterWindAnimation.ts
│     └─ user
│        ├─ components
│        │  ├─ Poem-Title-Card
│        │  │  └─ Poem-Title-Card.tsx
│        │  ├─ Poem-XL-Card
│        │  ├─ Poems-List
│        │  │  └─ PoemsList.tsx
│        │  ├─ User-Top-Hub
│        │  │  └─ UserTopHub.tsx
│        │  └─ User.tsx
│        ├─ context
│        │  └─ UserContext.tsx
│        └─ userTypes.ts
├─ tsconfig.json
└─ yarn.lock

```
