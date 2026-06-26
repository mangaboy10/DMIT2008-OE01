// export default -> this is what's imported when we e.g.
// import Hello from some/file.js
// basically, default export when we only want to export/import one (main) thing

// not using 'default' generally means you have multiple exported things in one file,
// and they'd have to be imported using named imports e.g. import {Hello, SomethingElse, Etc} from 'some/file.js'

// TLDR: export default is just what we write when we have one thing in this file
export default function Hello() {
  return (
    <p>This is my first component.</p>
  )
}
