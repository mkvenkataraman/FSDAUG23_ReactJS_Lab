import React, { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getItemsData } from "../services/ItemService";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import '../App.css';

export default function ShowList() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const data = await getItemsData();
                console.log(data);
                setItems(data);
                calculateOnItems(data);
            } catch (error: any) {
                console.error(error);
                setError(error);
            }
        }
        fetchItemsData();
    }, [showForm])

    const calculateOnItems = (data: IDataList[]) => {
        var rahulSpent1: number = 0;
        var rameshSpent1: number = 0;
        data.map((item) =>
            item.payeeName === "Rahul"
                ? (rahulSpent1 = rahulSpent1 + item.price, console.log(item.payeeName + ":" + item.price))
                : (rameshSpent1 = rameshSpent1 + item.price, console.log(item.payeeName + ":" + item.price))
        );
        setRahulSpent(rahulSpent1);
        console.log("Total Rahul Spent: " + rahulSpent1);
        setRameshSpent(rameshSpent1);
        console.log("Total Ramesh Spent: " + rameshSpent1);
        setSum(rahulSpent1 + rameshSpent1);
    }

    const getTableHeaders = () => {
        return (
            <>
                <div className="table-headers">
                    <div className="use-inline date header-color">Date</div>
                    <div className="use-inline expense-header header-color">Expense Description or Product Purchased</div>
                    <div className="use-inline price header-color">Price</div>
                    <div className="use-inline payee header-color" /*style={{width: 112}}*/>Payee</div>
                </div>
            </>
        )

    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    const renderExpense = (expense: IDataList) => {
        return (
            <div key={expense.id} className="expense-item">
                <div className="use-inline date">{formatDate(expense.setDate)}</div>
                <div className="use-inline expense">{expense.product}</div>
                <div className="use-inline price">{formatCurrency(expense.price)}</div>
                <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
            </div>
        )
    }

    const renderSummary = () => {
        return <>
            <div className="use-inline">Total Spend</div>
            <div className="use-inline total">{sum !== null ? formatCurrency(sum) : "N/A"}</div>
            <br />
            <div className="use-inline">Rahul Paid</div>
            <div className="use-inline total Rahul">{formatCurrency(rahulSpent)}</div>
            <br />
            <div className="use-inline">Ramesh Paid</div>
            <div className="use-inline total Ramesh">{formatCurrency(rameshSpent)}</div>
            <br />

            <span className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}</span>
            <span className="use-inline payable price"> {formatCurrency(Math.abs((rahulSpent - rameshSpent) / 2))}</span>

            {
                error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>
    }

    return <>
        <header id="page-header"><h1>Expense Tracker</h1></header>

        <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
        {
            showForm &&
            <div className="form">
                <ExpenseTrackerForm onClose={() => setShowForm(false)} />
            </div>
        }

        {getTableHeaders()}

        {/* {items && items.map((expense)=>renderExpense(expense))} */}

        {/*Added div for scrollable list */}
        <div className="scrollable-container">
            {items && items.map((expense) => renderExpense(expense))}
        </div>

        <hr />
        {renderSummary()}
    </>

}
