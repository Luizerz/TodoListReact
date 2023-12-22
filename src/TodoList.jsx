import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/tarefa.svg'

function TodoList() {

    const listStorage = localStorage.getItem('Lista');

    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(list))
    }, [list])

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setList([...list, { text: novoItem, isCompleted: false }])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function itemClick(index) {
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted
        setList(listAux)
    }

    function itemDelete(index) {
        const listAux = [...list];
        listAux.splice(index, 1);
        setList(listAux);
    }

    function deleteAllItens() {
        setList([])
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem} onChange={(e) => { setNovoItem(e.target.value) }} placeholder="Adicione uma tarefa"
                />
                <button
                    type="subimit"
                    className="add">
                    Add
                </button>
            </form>
            <div className="listaTarefas">
                <div className="tarefaItens">
                    {
                        list.length < 1
                            ?
                            <img className="icone-central" src={Icone} alt="icone" />
                            :
                            list.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item completo" : "item"}>
                                    <span onClick={() => { itemClick(index) }}>
                                        {item.text}
                                    </span>
                                    <button
                                        onClick={() => { itemDelete(index) }}
                                        className="del">
                                        Deletar
                                    </button>
                                </div>
                            ))
                    }
                </div>
                {
                    list.length > 0 &&
                    <button
                        onClick={() => { deleteAllItens() }}
                        className="deleteAll">
                        Deletar Todas
                    </button>
                }

            </div>
        </div>
    )
}

export default TodoList