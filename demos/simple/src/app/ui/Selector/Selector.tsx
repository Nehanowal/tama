import "./Selector.scss"

import DropDown, { DropDownOption } from "../DropDown/DropDown"
import Icon, { IconName } from "../Icon/Icon"
import { Mount, Proton } from "@denshya/proton"
import { State, StateOrPlain } from "@denshya/reactive"


interface SelectorProps<T> {
  name?: string
  label?: unknown
  placeholder?: unknown

  iconName?: StateOrPlain<IconName>

  children: JSX.Children<DropDownOption<T>>
}

function Selector<T = string | undefined>(this: Proton.Component, props: SelectorProps<T>) {
  const expanded = new State(false)
  const selected = new State<DropDownOption<T> | null>(null)

  // this.view.watch(view => [
  //   whenClickAway(view).subscribe(() => expanded.set(false))
  // ])

  return (
    <div className="selector">
      {props.label && (
        <div className="selector__label">{props.label}</div>
      )}
      <button className="selector__appearance" type="button" on={{ click: () => expanded.set(it => !it) }}>
        <Icon className="selector__icon" name={State.from(props.iconName ?? "")} />
        <div className="selector__placeholder" mounted={State.from(selected.is(null))}>{props.placeholder}</div>
        <div className="selector__current">{Mount.If(selected.$.props.$.children)}</div>
        <Icon className="selector__icon" classMods={{ up: expanded }} name="chevron-down" />
      </button>
      <DropDown expanded={expanded} selected={selected}>
        {props.children}
      </DropDown>
    </div>
  )
}

export default Selector


function whenClickAway(view: unknown) {
  return {
    subscribe(next: (event: MouseEvent) => void) {
      const asd = (event: MouseEvent) => {
        if (event.target instanceof Node === false) return

        if (view instanceof Node === false) return
        if (view.contains(event.target)) return

        next(event)
      }

      window.addEventListener("click", asd)
      return { unsubscribe: () => window.removeEventListener("click", asd) }
    }
  }
}
