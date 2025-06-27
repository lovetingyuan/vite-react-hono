export default function ApiTest() {
  return (
    <button
      onClick={() => {
        fetch('/api/test')
          .then(res => res.json())
          .then(data => {
            alert('success! /api/test: ' + JSON.stringify(data))
          })
      }}
    >
      click to send api
    </button>
  )
}
