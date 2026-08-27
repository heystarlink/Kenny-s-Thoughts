import React, { useEffect, useRef, useState } from "react"

type useDropdownType = () => [
  React.RefObject<HTMLDivElement>,
  boolean,
  () => void,
  () => void
]

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`)
  }
}

const useDropdown: useDropdownType = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)

  useEffect(() => {
    if (!isDropdownOpened) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current) return
      assertIsNode(event.target)
      if (!menuRef.current.contains(event.target)) {
        setIsDropdownOpened(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDropdownOpened(false)
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDropdownOpened])

  const toggle = () => setIsDropdownOpened((opened) => !opened)
  const close = () => setIsDropdownOpened(false)

  return [menuRef, isDropdownOpened, toggle, close]
}

export default useDropdown
