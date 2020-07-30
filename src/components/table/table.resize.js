import {$} from '../../core/DOM'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.clientX - coords.right
      value = (coords.width + delta) + 'px'
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.clientY - coords.bottom
      value = (coords.height + delta) + 'px'
      $resizer.css({bottom: -delta + 'px'})
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmousedown = null 

      if (type === 'col') {
        $parent.css({width: value})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value)
      } else {
        $parent.css({height: value})
      }

      $resizer.css({
        bottom: '0',
        right: '0',
        opacity: '0'
      })
    }
  }
}
