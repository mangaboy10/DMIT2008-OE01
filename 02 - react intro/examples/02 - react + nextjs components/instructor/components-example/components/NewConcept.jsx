// "props", short for 'properties', are the standard way of passing data
// between components, and generally look like HTML attributes in the JSX

// There are two ways of ingesting props:
//   a) one single argument for all props -> each prop is a property on that argument
//   b) destructuring -> each prop directly (e.g. {concept, author} )
// You'd use this in JSX as:
//   <NewConcept concept="how to make a component" author="Oliver" />

export default function NewConcept({ concept }) {
  // I think destructuring input props is the better way, because then it's
  // immediately apparent what you're ingesting/using. If we didn't destructure
  // and just had one object/argument for all props, like before, we'd have to read
  // allllllll the code to understand which props were being used how first.
  return (
    <p>In this class, we've learned: {concept}</p>
  )
}
