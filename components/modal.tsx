import React, {useEffect, useState} from "react";
import css from "./modal.module.scss"
import {becomeMemberId, signupId} from "../pages/involved";

export const id = "20231101-annual-mtng"
export const registerUrl = "mailto:embankmentjc@gmail.com?subject=Register%20for%20Embankment%20annual%20meeting&body=Please%20register%20me%20for%20the%20meeting%20(Wednesday,%20November%201,%202023%20at%207pm%20at%20Grace%20Church%20Van%20Vorst).%0a%0aThank%20you,%0a%3CYour%20name%3E"

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
    useEffect(
        () => {
            if (!localStorage.getItem(modalSuppressedKey)) {
                setShowModal(true)
            }
            const listener = () => { setShowModal(false) }
            document.addEventListener('click', listener)
            return () => document.removeEventListener('click', listener)
        },
        []
    )
    return (
        <div
            id={id}
            className={`modal ${css.modal} ${showModal ? "" : css.hidden}`}
            tabIndex={-1}
            role="dialog"
            style={{top: "56px",}}
        >
            <div className={`modal-dialog modal-dialog-centered`} role="document">
                <div
                    className={`modal-content ${css.content}`}
                    onClick={e => { e.stopPropagation()}}
                >
                    <button className={`close ${css.close}`} onClick={() => setShowModal(false)}>x</button>
                    <div className="modal-header" style={{display: "block",}}>
                        <h3>Attend the Embankment Coalition's Annual Meeting!</h3>
                        <ul style={{listStyle: "none",}}>
                            <li>Wednesday, November 1, 2023, 7pm</li>
                            <li><a target={"_blank"} href={"https://www.gracevanvorst.org/"}>Grace Church Van Vorst</a></li>
                            <li><a target={"_blank"} href={"https://maps.app.goo.gl/fJRv7b81QBir98Fm7"}>39 Erie St, Jersey City, NJ (enter on 2nd Street)</a></li>
                        </ul>
                        <p><a target={"_blank"} href={registerUrl}><strong>Click to email your RSVP to embankmentjc@gmail.com</strong></a></p>
                        <ul>
                            <li><strong>Updates from EPC Board Members:</strong></li>
                            <li>Project Status - Federal and local efforts</li>
                            <li>Designing Our Future</li>
                            <li>What you can do to help</li>
                        </ul>
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
