import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Transactions() {


    const [modalTitle, setModalTitle] = useState("");
    const [TransactionId,setTransactionId]= useState();
    const [Amount,setAmount]= useState();
    const [Type,setType]= useState();
    const [Note,setNote]= useState();
    const [Category,setCategory]= useState();
    const [IsRecurring, setRecurring] = useState();
    const [transactions,setTransactions]= useState([]);
    const [categories,setCategories]= useState([]);
    const [UserId,setUserId]= useState();
    



   useEffect(() => {

    var session = localStorage.getItem("session");
    console.log(session);
    setUserId(session);

    fetch('http://localhost:5130/getTransactions',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": 4
          })
    })
    .then(response => response.json())
    .then(data => {
        setTransactions(data);
        console.log(data)
    });

    fetch('http://localhost:5130/getCategories',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            "user_id": 4,
          })
    })
    .then(response => response.json())
    .then(cat => {
        setCategories(cat);
        console.log(cat)
    });

    

   },[])

   
   

   function addClick() {
    setModalTitle("Add Transactions")
    setTransactionId(0);
    setAmount();
    setType();
    setNote();
    setCategory();
    setRecurring();

}




function editClick(tr) {
    console.log(tr.TransactionId);
    setModalTitle("Edit Transactions")
    setTransactionId(tr.TransactionId);
    setAmount(tr.Amount);
    setType(tr.Type);
    setNote(tr.Note);
    setCategory(tr.Category);
    setRecurring(tr.IsRecurring);
    

}


   
function isRecurring(value){
    if (value == true) {
        setRecurring(1)
    }else{
        setRecurring(0)
    }
    // console.log("this is",IsRecurring)
}

function SetType(value){
    console.log("this is",value)
    if (value == "1") {
        setType(1)
    }else{
        setType(0)
    }
    console.log("this is",Type)
}

function createClick() {

    
    var txt = JSON.stringify({
        user_id:UserId,
        amount: Amount,
        type: Type,
        category: Category,
        note: Note,
        is_recurring: IsRecurring
    })

    console.log(txt);
    

    fetch('http://localhost:5130/postTransactions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: txt
    })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            window.location.reload();
        }, (error) => {
            alert('Failed');
        })

    }
    
    function updateClick() {


        var uptxt = JSON.stringify({
            user_id:UserId,
            id:TransactionId,
            amount: Amount,
            type: Type,
            category: Category,
            note: Note,
            is_recurring: IsRecurring
        })
    
        console.log(uptxt);
        
    
        fetch('http://localhost:5130/updateTransactions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: uptxt
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                window.location.reload();
            }, (error) => {
                alert('Failed');
            })

}   


function deleteClick() {


    var uptxt = JSON.stringify({
        id:TransactionId,
        
    })

    console.log(uptxt);
    

    fetch('http://localhost:5130/deleteTransaction', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: uptxt
    })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            window.location.reload();
        }, (error) => {
            alert('Failed');
        })

}

    

  return (
    <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => addClick()}>
                    Add Transactions
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Transaction Id
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Note
                            </th>
                            <th>
                                IsRecuring
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tr =>
                            <tr key={tr.TransactionId}>
                                <td>{tr.TransactionId}</td>
                                <td>{tr.Amount}</td>
                                <td>{tr.Type == 1 ? "Expense"  : "Income"}</td>
                                <td>{tr.Category}</td>
                                <td>{tr.Note}</td>
                                <td>{tr.IsRecurring}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => editClick(tr)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => deleteClick(tr.TransactionId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Amount</span>
                                            <input type="text" className="form-control"
                                                value={Amount}
                                                 onChange={e=>setAmount(e.target.value)}
                                                 />
                                        </div>

                                        <div className="input-group">
                                        <label for="input-type">Type:</label>
                                        <div id="input-type" class="flex-row">
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input name="account_type" id="input-type-expense" value="1" type="radio" onChange={e=>SetType(e.target.value)}
                                                    /> Expense
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input name="account_type" id="input-type-income" value="2" type="radio" onChange={e=>SetType(e.target.value)} />Income
                                                </label>
                                            </div>
                                            </div>
                                        
                                    </div>

                                        <div className=" input-group mb-3">
                                            <label class = "p-2" for="cat">Category: </label>
                                            <div class = "p-2" ><select onChange={e=>setCategory(e.target.value)}>
                                                {categories.map(cat => {
                                                return (
                                                    <option value={cat.id}> {cat.name} </option>
                                                )
                                                })}
                                            </select>
                                            </div>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Note</span>
                                            <input type="text" className="form-control"
                                                value={Note}
                                                onChange={e=>setNote(e.target.value)} 
                                                />
                                        </div>

                                        <div className="form-check">
                                            <label class="form-check-label" for="exampleCheck1">Recurring Transaction</label>
                                            <input type="checkbox" className="form-check-input"
                                                value={IsRecurring}
                                                onChange={e=>isRecurring(e.target.checked)}
                                                />
                                        </div>
                                        



                                    </div>
                                  
                                </div>

                                {TransactionId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => createClick()}
                                    >Create</button>
                                    : null}

                                {TransactionId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
  )
}
