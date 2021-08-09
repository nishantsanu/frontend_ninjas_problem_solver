import React from 'react';
import Auxx from '../../hoc/Auxx';
import NewCommentArea from '../BodyContainer/CommentContainer/NewCommetArea/NewCommetArea';
import './Content.css';


const Content = (props) => {
    const ingredientSummary = props.posts
        .map(item => {
            const commentView = item.comments.map(singleComment => {
                return (<li style={{ listStyleType: "none" }} key={singleComment._id}>
                    <input type="email" readOnly
                        value={singleComment.description} style={{marginTop:10, borderRadius:5,color:'black' }}class="form-control"placeholder="" />

                </li>);
            })
            return <li key={item._id}>
                <div class="card post" >
                    <div class="card-body" style={{ background: "#b593cc54" }}>
                        <div class="upperband">
                            <h5 class="card-title"
                            >{item.title}</h5>
                            <div>{item.status}
                            </div>
                        </div>

                        <p class="card-text">{item.description}</p>
                        <div><span className="askedby"><strong>Asked By : {item.postedBy.email}</strong> on {item.createdAt.toLocaleString().substring(0, 10)}</span></div>
                        <hr></hr>
                        <ul>
                            {commentView}
                        </ul>
                        {props.welcomeName ? <NewCommentArea
                            key={"com" + item._id}
                            parentPost={item._id}
                            updateCommentList={props.updateCommentList} /> : null}
                    </div>
                </div>
            </li>
        });
    return (
        <Auxx class="mainbg">
            <ul style={{ listStyleType: "none" }} className="ulpost">
                {ingredientSummary}
            </ul>
        </Auxx>

    );
}

export default Content;