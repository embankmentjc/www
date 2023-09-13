import React, {useEffect, useState} from "react";
import css from "./modal.module.scss"
import {involvedSectionMemberId} from "../pages/involved";

export const id = "2023-stb-modal"

export function Modal() {
    const modalSuppressedKey = `${id}_suppressed`

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
                    <div className="modal-header" style={{display: "block",}}>
                        <h3>Hold the Date!</h3>
                        <ul style={{listStyle: "none",}}>
                            <li><strong>Surface Transportation Board online meeting</strong></li>
                            <li>Thursday, September 28, 2023, 5 to 9 pm</li>
                            <li>Re: Conrail's Proposed Abandonment of Harsimus Branch (Docket No. AB-167 (Sub.no. 1189X)</li>
                        </ul>
                        <p>
                            This may be <strong>the public's last meaningful chance to comment</strong> on Conrail's proposed abandonment of the Harsimus Branch and Embankment in Jersey City before the regulatory agency rules on its fate.
                        </p>
                        <p>
                            Meeting details, including the agenda, log-in information, and other logistics will be circulated at least two weeks prior to the September 28 meeting.
                        </p>
                        <p>
                            Check back here for details, or <a href={`/involved#${involvedSectionMemberId}`}><strong>sign up for our email list</strong></a> to stay informed.
                        </p>
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
