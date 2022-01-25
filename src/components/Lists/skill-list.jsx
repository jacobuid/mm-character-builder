import React from 'react';

const SkillList = (props) => {

    const [skill, setSkill] = React.useState('');
    const [editing, setEditing] = React.useState(false);

    const handleChange = e => {
        setSkill(e.target.value);
    };

    const handleSubmit = event => {
        if (props.addCallback && skill) {
            props.addCallback(skill, 'skills');
        }
        setSkill('');
        event.preventDefault();
    };

    const handleRemove = name => {
        props.removeCallback(name, 'skills');
    };

    return (
        <div>
            <ul>
                {props.skills.map((item, i) => (
                    <li key={i}>
                        {editing ?
                            <input type="text" value={item.name} /> :
                            <label>{item.name}</label>
                        }


                        <button type="button" onClick={() => setEditing(!editing)}>edit</button>
                        <button type="button" onClick={() => handleRemove(item.id)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="text" value={skill} onChange={handleChange} />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default SkillList;