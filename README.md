
```
poem-journal-next
├─ .eslintrc.json
├─ a.html
├─ global.d.ts
├─ next.config.mjs
├─ package.json
├─ parsedTestPoem.ts
├─ public
│  ├─ background.jpg
│  ├─ Horizontal_Tree.svg
│  └─ Vertical_Tree.svg
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
│     │  │  │  ├─ components
│     │  │  │  │  ├─ poemDetails.tsx
│     │  │  │  │  └─ poemMetadata.tsx
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
│     │  │  │  ├─ NavBar.tsx
│     │  │  │  ├─ NavBar2.tsx
│     │  │  │  └─ subcomponents
│     │  │  │     ├─ Search
│     │  │  │     │  ├─ Search.tsx
│     │  │  │     │  ├─ SearchBar
│     │  │  │     │  │  └─ SearchBar.tsx
│     │  │  │     │  └─ SearchResults
│     │  │  │     │     └─ SearchResults.tsx
│     │  │  │     ├─ UserMenu
│     │  │  │     │  ├─ Menu
│     │  │  │     │  │  └─ Menu.tsx
│     │  │  │     │  └─ UserMenu.tsx
│     │  │  │     └─ UserNavigation
│     │  │  └─ ProtectedRoute
│     │  │     └─ ProtectedRoute.tsx
│     │  └─ utils
│     ├─ theme
│     │  ├─ components
│     │  ├─ context
│     │  │  └─ ThemeContext.tsx
│     │  ├─ theme
│     │  │  └─ theme.ts
│     │  └─ theme.d.ts
│     ├─ tree-animation
│     │  ├─ AnimationContainer.tsx
│     │  ├─ animations
│     │  │  ├─ hasNotPlayed.ts
│     │  │  └─ hasPlayed.ts
│     │  ├─ components
│     │  │  ├─ ClientProviders.tsx
│     │  │  ├─ NavBar
│     │  │  └─ TreeAnimation.tsx
│     │  ├─ constants
│     │  │  └─ groupSelectors.ts
│     │  ├─ contexts
│     │  │  └─ SeasonContext.tsx
│     │  └─ hooks
│     │     ├─ bootAnimation
│     │     │  ├─ birdsAnimation.ts
│     │     │  ├─ floatingLeavesAnimation.ts
│     │     │  ├─ flowersAnimation.ts
│     │     │  ├─ leavesAnimation.ts
│     │     │  ├─ snowPlopsAnimation.ts
│     │     │  ├─ trunkBranchesAnimation.ts
│     │     │  └─ winterWindAnimation.ts
│     │     └─ loopAnimation
│     │        ├─ birdsMovementAnimation.ts
│     │        ├─ flowerTwirlPopRandomAnimation.ts
│     │        ├─ loopingAutumnLeavesAnimation.ts
│     │        └─ persistentWinterWindAnimation.ts
│     └─ user
│        ├─ components
│        │  ├─ Poem-Title-Card
│        │  │  └─ Poem-Title-Card.tsx
│        │  ├─ Poem-XL-Card
│        │  ├─ Poems-List
│        │  │  └─ PoemsList.tsx
│        │  ├─ StatusBar
│        │  │  └─ StatusBar.tsx
│        │  ├─ User-Top-Hub
│        │  │  └─ UserTopHub.tsx
│        │  └─ User.tsx
│        ├─ context
│        │  └─ UserContext.tsx
│        └─ userTypes.ts
├─ tsconfig.json
└─ yarn.lock

```