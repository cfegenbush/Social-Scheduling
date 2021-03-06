import * as React from 'react';
import { environment } from '../../environment';
import { FaTrash, FaCheck } from 'react-icons/fa';

export class InterestsFormComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            interests: [''],
        }
    }

    public addInterest = (e: any) => {
        e.preventDefault();
        this.setState((prevState: any) => ({
            interests: [...prevState.interests, ''],
        }));
    }

    public removeInterest = (e: any, index: number) => {
        e.preventDefault();
        this.setState({
            interests: this.state.interests.filter((_: any, i: any) => i !== index)
        });
    }

    public handleChange = (e: any) => {
        e.preventDefault();
        const interests = [...this.state.interests]
        interests[e.target.id] = e.target.value
        this.setState({ interests }, () => console.log(this.state.interests))
    }

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const i = this.state;
        console.log(i.interests);
        for (const x of i.interests) {
            console.log(x);
            fetch(environment.context + `users/${JSON.parse(localStorage.getItem('userId') || '{}')}/addInterest`, {
                body: JSON.stringify({ id: x }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
                .then(resp => resp.json())
                .then(interestData => {
                    this.props.history.push('/calendar');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    public render() {
        const { interests } = this.state;
        return (
            <div className="mt-5 pt-5 container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form className="form-signup" onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please select your interests
                            <span className="float-right mb-1"><button onClick={this.addInterest} className="btn btn-info">Add More Interest</button></span></h1>
                            {
                                interests.map((val: any, index: any) => {
                                    return (
                                        <div key={index} className="form-group pt-2">
                                            <label htmlFor={`inputInterest${index}`} >{`Interest #${index + 1}`}</label>
                                            <span className="float-right"><button className="btn btn-light" onClick={(e) => this.removeInterest(e, index)}><FaTrash className="text-danger"/></button></span>

                                            <select className="form-control"
                                                onChange={this.handleChange}
                                                value={interests[index].id}
                                                id={index}
                                                required
                                            >
                                                <option value="0">Select an Interest</option>
                                                <option value="1">Sports</option>
                                                <option value="2">Movies</option>
                                                <option value="3">Shopping</option>
                                                <option value="5">Beach</option>
                                                <option value="6">Traveling</option>
                                                <option value="7">Gaming</option>
                                            </select>                                            
                                        </div>
                                    )
                                })
                            }

                            <button className="btn btn-lg btn-primary btn-block" type="submit" value="Add Node server"><FaCheck/> Submit</button>
                            {/* {errorMessage && <p id="error-message">{errorMessage}</p>} */}
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

