import React, { useEffect, useState } from "react";
import css from "./modal.module.scss"
import { signupId } from "./ids";

export const id = "20251112-council-mtng"
export const registerUrl = "mailto:embankmentjc@gmail.com?subject=City%20Council%20Meeting%20Inquiry"

export function Modal() {
    const modalSuppressedKey = `${id}_suppressed-v2`

    function setModalSuppressCookie(checked: boolean) {
        console.log("checked:", checked);
        if (checked) {
            localStorage.setItem(modalSuppressedKey, "true")
        } else {
            localStorage.removeItem(modalSuppressedKey)
        }
        console.log("set cookie:", localStorage.getItem(modalSuppressedKey))
    }

    const [ showModal, setShowModal ] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem(modalSuppressedKey)) {
            setShowModal(true)
        }
    }, [])

    useEffect(() => {
        if (showModal) {
            const listener = (e: MouseEvent) => {
                const target = e.target as HTMLElement
                if (!target.closest('.modal-dialog')) {
                    setShowModal(false)
                }
            }
            document.addEventListener('click', listener)
            return () => document.removeEventListener('click', listener)
        }
    }, [showModal])
    return (
        <div
            id={id}
            className={`${css.modal} ${showModal ? "" : css.hidden}`}
            tabIndex={-1}
            role="dialog"
            style={{top: "56px",}}
        >
            <div className={`modal-dialog modal-dialog-centered`} role="document" style={{zIndex: 1060}}>
                <div
                    className={`modal-content ${css.content}`}
                    onClick={e => { e.stopPropagation()}}
                >
                    <button className={`close ${css.close}`} onClick={() => setShowModal(false)}>x</button>
                    <div className="modal-header" style={{display: "block",}}>
                        <h3>Upcoming City Council Meeting</h3>
                        <h4>CITY COUNCIL MEETING</h4>
                        <ul style={{listStyle: "none",}}>
                            <li><strong>Wednesday, November 12, 2025, 6PM</strong></li>
                            <li>City Hall, 280 Grove Street, Jersey City</li>
                        </ul>
                        <p><strong>City Council Vote on Settlement, PILOT & IZO Amendment</strong></p>
                        <p><a href={`/involved#${signupId}`}><strong>Sign up for our email list</strong></a> to stay informed.</p>
                    </div>
                    <div className="modal-body" onBlur={() => console.log("blur!")}>
                        <div className="group group-xl offset-top-30">
                            <button className="btn btn-default" aria-label="Close" onClick={() => setShowModal(false)}>
                                <span className="btn-text">
                                    Dismiss
                                </span>
                            </button>
                        </div>
                        <label>
                            <input
                                type="checkbox"
                                onClick={e => {
                                    const checked = (e.target as HTMLInputElement).checked
                                    console.log("label click; checked:", checked)
                                    setModalSuppressCookie(checked)
                                }}
                            />
                            <span>Don't show this message again</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
