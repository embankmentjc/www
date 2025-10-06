import React, { useEffect, useState } from "react";
import css from "./modal.module.scss"
import { signupId } from "./ids";

export const id = "20251012-annual-mtng"
export const registerUrl = "mailto:embankmentjc@gmail.com?subject=RSVP%20for%20Annual%20Meeting"

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
                        <h3>Please Attend These URGENT Meetings</h3>
                        <p><a target={"_blank"} href={"/pdf/2025-annual-meeting.pdf"}><strong>View/Download Flyer (PDF)</strong></a></p>
                        <h4>ANNUAL MEETING</h4>
                        <ul style={{listStyle: "none",}}>
                            <li><strong>Sunday, October 12, 2025, 7-9PM</strong></li>
                            <li><a target={"_blank"} href={"https://www.gracevanvorst.org/"}>Grace Church Van Vorst</a></li>
                            <li><a target={"_blank"} href={"https://maps.app.goo.gl/fJRv7b81QBir98Fm7"}>39 Erie St, Jersey City, NJ (enter on 2nd Street)</a></li>
                        </ul>
                        <p><strong>Important Updates on Settlement Status, Next Steps & What YOU Can Do</strong></p>
                        <p><a href={registerUrl}><strong>Click to email your RSVP</strong></a> or email: embankmentjc@gmail.com</p>
                        <hr />
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
