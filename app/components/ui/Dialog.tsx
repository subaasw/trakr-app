import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        console.log("hehe");
        
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'visible'
    }
  }, [isOpen, handleEscape])

  if (!isMounted) {
    return null
  }

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="z-50 w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>,
    document.body
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-lg font-semibold">{children}</div>
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end space-x-2">{children}</div>
}
