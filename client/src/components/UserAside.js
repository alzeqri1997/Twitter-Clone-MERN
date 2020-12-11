import React from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg';


const UserAside = ({ profileImgeUrl, username }) => (
    <aside className="col-sm-2">
        <div className="panel panel-default" >
            <div className="panel-body" >
                <img
                    src={profileImgeUrl || DefaultProfileImg}
                    alt={username}
                    className="img-thumbnail"
                />
            </div>
        </div>
    </aside>
);

export default UserAside;