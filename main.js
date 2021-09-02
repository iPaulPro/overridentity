/*
 Copyright (C) Paul Burke 2021
 Github: @ipaulpro/overridentity
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

const appRootObserverCallback = () => {
  const groupItems = document.getElementsByClassName('list-group-item')
  if (groupItems.length === 0) return

  appRootObserver.disconnect()

  const params = new URLSearchParams(window.location.search)
  const accessLevelRequest = params.get('accessLevelRequest') || 2

  if (accessLevelRequest < 2 || accessLevelRequest > 4) return

  Array.from(groupItems).forEach((item, index) => {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = accessLevelRequest > (index + 1)
    input.disabled = index < (accessLevelRequest - 2) || index === 0
    input.onchange = ev => {
      const checked = ev.target.checked
      const level = checked ? index + 2 : index + 1
      document.location = '/log-in?accessLevelRequest=' + level
    }

    const checkbox = document.createElement('div')
    checkbox.className = 'form-check form-check-inline'
    checkbox.appendChild(input)

    const iconSpan = item.firstElementChild
    item.insertBefore(checkbox, iconSpan)
    item.removeChild(iconSpan)
  })
}

const appRootObserver = new MutationObserver(appRootObserverCallback)

const init = () => {
  const appRoot = document.querySelector('app-root')
  if (appRoot) {
    const appRootObserverConfig = {childList: true, subtree: true}
    appRootObserver.observe(appRoot, appRootObserverConfig)
  }
}

init()
