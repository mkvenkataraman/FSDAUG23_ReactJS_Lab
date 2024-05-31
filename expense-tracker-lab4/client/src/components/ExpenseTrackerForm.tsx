import React, { ChangeEvent, Component, FormEvent } from "react";
import { pushData } from "../services/ItemService";

// type Props = {
//     onClose:any
// }

type Props = {
    onClose: () => void;
}

type State = {
    product: string;
    price: number;
    payeeName: string;
    setDate: string
}

export default class ExpenseTrackerForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: "",
            price: 0,
            payeeName: "",
            setDate: ""
        }
    }

    submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const finalData = { ...this.state };
        const data = await pushData(finalData);
        console.log(data);
        this.props.onClose();
        this.setState(
            {
                product: "",
                price: 0,
                payeeName: "",
                setDate: ""
            }
        )

    }

    setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName: event.target.value
        });
    }

    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product: event.target.value
        });
    }

    setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price: parseInt(event.target.value)
        });
    }

    loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate: event.target.value,
        });
    }

    /* Method: A handleClose method is created to reset the form and call the onClose prop. */
    handleClose = () => {
        this.resetForm();
        this.props.onClose();
        // window.close();
    }

    /*Method: The resetForm method resets the form state. */
    resetForm = () => {
        this.setState({
            product: "",
            price: 0,
            payeeName: "",
            setDate: ""
        });
    }

    /*render is mandatory in class component*/
    render() {
        return (
            <section>
                <header>
                    <h1>Add new Expenses or Purchases</h1>
                    <p>
                        Read the below instructions before proceeding:
                        <br />
                        Make use you fill all the fileds marked *
                    </p>
                </header>

                <form onSubmit={this.submitHandler}>
                    <article>
                        <p>Name</p>
                        <select name="Name" required
                            value={this.state.payeeName}
                            onChange={this.setPayee}>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Rahul" >Rahul</option>
                            <option value="Ramesh" >Ramesh</option>
                        </select>
                    </article>

                    <article>
                        <p>Expenses Incurred/Product Purchased</p>
                        <input type="text" required value={this.state.product} onChange={this.setProduct}></input>
                    </article>


                    <article>
                        <p>Price</p>
                        <input type="number" required value={this.state.price} onChange={this.setPrice} />
                    </article>

                    <article>
                        <p>Date</p>
                        <input type="date" required value={this.state.setDate} onChange={this.loggedDate} />
                    </article>

                    {/* <button type="button" className="form-button" onClick={this.props.onClose}>Close</button> */}

                    {/* The "Close" button uses onClick={this.handleClose} to ensure the form state is reset before calling the parent component's onClose method. */}
                    <button type="button" className="form-button close" onClick={this.handleClose}>Close</button>
                    <button type="submit" className="form-button submit">Submit</button>
                    <button type="button" className="form-button clear" onClick={this.resetForm}>Clear</button>

                </form>
            </section>
        )
    }

}
