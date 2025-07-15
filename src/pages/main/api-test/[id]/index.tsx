import { useParams } from 'react-router'

export default function ApiTest() {
  const params = useParams()

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        fetch('/api/test?id=' + params.id)
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
