﻿import { getWidth } from "../../modules/utility.js?v=8.4.1-beta03"
import Data from "../../modules/data.js?v=8.4.1-beta03"
import Popover from "../../modules/base-popover.js?v=8.4.1-beta03"

export function init(id) {
    const el = document.getElementById(id)
    if (el == null) {
        return
    }

    const setWidth = () => {
        const minWidth = parseFloat(el.dataset.bbMinWidth || '580');
        let width = getWidth(el);
        if (width < minWidth) {
            width = minWidth;
        }
        const dropdown = el.querySelector('.dropdown-object') || document.querySelector('.popover-dropdown .dropdown-object');
        if (dropdown) {
            dropdown.style.setProperty('--bb-dropdown-object-width', `${width}px`);
        }
    }

    const popover = Popover.init(el);

    const observer = new ResizeObserver(setWidth);
    observer.observe(el)

    const selectTable = {
        el,
        input: el.querySelector(".form-select"),
        popover,
        observer
    }

    Data.set(id, selectTable)
}

export function close(id) {
    const data = Data.get(id)
    if (data) {
        data.popover.popover.hide();
    }
}
export function dispose(id) {
    const data = Data.get(id)
    Data.remove(id)

    if (data) {
        data.observer.disconnect();
        Popover.dispose(data.popover)
    }
}
