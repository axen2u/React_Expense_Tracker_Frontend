import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Category() {


    const [modalTitle, setModalTitle] = useState("");
    const [CategoryId,setCategoryId]= useState([]);
    const [Name,setName]= useState();
    const [Budget,setBudget]= useState();
    const [Type,setType]= useState();
    const [Note,setNote]= useState();
    // const [Category,setCategory]= useState();
    const [sum, setSum] = useState();
    const [categories,setCategories]= useState([]);
    const [UserId,setUserId]= useState();


    useEffect(() => {

        var session = localStorage.getItem("session");
        console.log("Session",session);
        setUserId(session);
    
    
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

        fetch('http://localhost:5130/getBudgets',{
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
        .then(budget => {
            setSum(budget);
            console.log(budget)
        });
    
       },[])


function editClick(tr) {
    console.log(tr.id);
    setModalTitle("Edit Category")
    setBudget(tr.budget);
    setName(tr.name);
    setType(tr.type);
    

}


function addClick() {
    setModalTitle("Add Category")
    setBudget();
    setName();
    setType();

}

function createClick() {

    
    var txt = JSON.stringify({
        budget: Budget,
        name: Name,
        category: Category,
    })

    console.log(txt);
    

    fetch('http://localhost:5130/postTransactions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:txt
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

        setModalTitle("")

        var uptxt = JSON.stringify({
            "id": CategoryId,
            "user_id": UserId,
            "type": Type,
            "name": Name,
            "budget": Budget
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
    

  return (
    <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => addClick()}
                    >
                    Add Category
                </button>
                <h2>Categories</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Budget
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(tr =>
                            <tr key={tr.id}>
                                <td>{tr.id}</td>
                                <td>{tr.name}</td>
                                <td>{tr.budget}</td>
                                <td>{tr.type == 1 ? "Expense"  : "Income"}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => editClick(tr)}
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                            
                                </td>
                            </tr>
                            
                        )}
                    </tbody>
                </table>
                <div></div><h2>Summary</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Category
                            </th>
                            <th>
                                Budget
                            </th>
                            <th>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sum.map(tr =>
                            <tr key={tr.id}>
                                <td>{tr.name}</td>
                                <td>{tr.budget}</td>
                                <td style={tr.total_transactions <= tr.budget ? { color: 'green'} : { color: 'red' }}>{tr.total_transactions}</td>
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
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control"
                                                value={Name}
                                                onChange={e=>setName(e.target.value)} 
                                                />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Budget</span>
                                            <input type="text" className="form-control"
                                                value={Budget}
                                                 onChange={e=>setBudget(e.target.value)}
                                                 />
                                        </div>

                                        <div className="input-group">
                                        <label for="input-type">Type:</label>
                                        <div id="input-type" class="flex-row">
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input name="account_type" id="input-type-expense" value="1" type="radio" 
                                                    onChange={e=>setType(e.target.value)}
                                                    /> Expense
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="radio-inline">
                                                    <input name="account_type" id="input-type-income" value="2" type="radio" 
                                                    onChange={e=>setType(e.target.value)} 
                                                    />Income
                                                </label>
                                            </div>
                                            </div>
                                        
                                        </div>

                                    </div>
                                  
                                </div>

                                {CategoryId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => createClick()}
                                    >Create</button>
                                    : null}

                                {CategoryId !== 0 ?
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