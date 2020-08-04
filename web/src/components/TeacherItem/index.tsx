import React from 'react'
import wppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

export default function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/55035738?s=460&u=484f63c094a4305c703a8702688c6e36b1654e75&v=4" alt="Cleiton"/>

            <div>
                <strong>Cleiton</strong>
                <span>Física</span>
            </div>
        </header>

        <p>
            Jdlwld0dak wladsadnauwadhwadwadawudasdasd.
            <br/><br/>
            Kdjiwdhibdhbwadbwuadbhuwbdhabdawbdhwabdhbawdhjbaw djwbadiywb adbnjwaidbawid awdjnawbhidi dauiwhdauiwdba daiwbdyaiwdaw.


        </p>

        <footer>
            <p>
                Preço/Hora
                <strong>R$ 70,00</strong>
            </p>
            <button type="button">
                <img src={wppIcon} alt=""/>
                Entrar em contato
            </button>

        </footer>
    </article>
    )
}