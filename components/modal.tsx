import React, {useEffect, useState} from "react";
import css from "./modal.module.scss"
import {becomeMemberId, signupId} from "../pages/involved";

export const id = "2023-stb-modal"
export const registerUrl = "https://www.zoomgov.com/meeting/register/vJItf-muqjIqHwFL6t68ih8dpwboGSduj2s"
export const emailUrl = "mailto:Karen.Stevens@stb.gov?subject=Register+to+comment+at+Embankment+meeting&body=Please+register+me+to+comment+at+the+Surface+Transportation+Board+online+meeting+on+Thursday%2C+September+28.+Thank+you%21"

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
                        <h3>Speak out for Harsimus Branch & Embankment Preservation!</h3>
                        <ul style={{listStyle: "none",}}>
                            <li><strong>Surface Transportation Board online meeting</strong></li>
                            <li>Thursday, September 28, 2023, 5 to 9 pm</li>
                            <li>Re: Conrail's Proposed Abandonment of Harsimus Branch (Docket No. AB-167, Sub. no. 1189X)</li>
                        </ul>
                        <p><a target={"_blank"} href={registerUrl}><strong>Register for the meeting here</strong></a>, and email <a target={"_blank"} href={emailUrl}><strong>Karen.Stevens@stb.gov</strong></a> to sign up to speak.</p>
                        <p>
                            This may be <strong>the public's last meaningful chance to comment</strong> on Conrail's proposed abandonment of the Harsimus Branch and Embankment in Jersey City before the regulatory agency rules on its fate.
                        </p>
                        <p>
                            <a href={"/news#news-section-recent"} onClick={() => setModalSuppressCookie(true)}>Learn more about the meeting here</a>, or <a href={`/involved#${signupId}`}><strong>sign up for our email list</strong></a> to stay informed.
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
