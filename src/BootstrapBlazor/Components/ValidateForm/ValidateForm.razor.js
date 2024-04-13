﻿import EventHandler from "../../modules/event-handler.js?v=8.4.1-beta03"

export function init(id) {
    const el = document.getElementById(id)

    EventHandler.on(el, 'keydown', e => {
        if (e.target.nodeName !== 'TEXTAREA') {
            const dissubmit = el.getAttribute('data-bb-dissubmit') === 'true'
            if (e.keyCode === 13 && dissubmit) {
                e.preventDefault()
                e.stopPropagation()
            }
        }
    })
}

export function dispose(id) {
    const el = document.getElementById(id)
    EventHandler.off(el, 'keydown')
}
