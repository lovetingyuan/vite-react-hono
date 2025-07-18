import style from './style.module.css'
console.log('css-module', style)
export default function FooHome() {
  console.log(style.bar, style['title-bold'])
  return (
    <p className={[style.title, style.titleLarge, style['title-bold']].join(' ')}>
      this is fooHome
    </p>
  )
}
