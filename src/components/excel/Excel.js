import {$} from '../../core/DOM'

export class Excel {
  constructor(selector, options) {
    this.$container = $(selector)
    this.components = options.components
  }
  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      // DEBUGGER
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      const $el = $.create('div', Component.className)
      const component = new Component($el)

      $el.html(component.toHTML())
      $root.append($el)
      
      return component
    })
    return $root
  }

  render() {
    this.$container.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
