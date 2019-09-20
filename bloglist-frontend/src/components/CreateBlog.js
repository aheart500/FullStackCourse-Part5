import React,{ useState } from 'react'
import services from '../services/blogs'
const CreateBlog =({ state }) => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
    const [blogs,setBlogs,setNotification] = state
    const [visible,setVisible] = useState(false)
    const handleCreate = async(event) => {
        event.preventDefault()
        try{
            const postedBlog = await services.createBlogReq({
                title,
                author,
                url
            })
            setNotification({
                message : `Successfully added "${title}" to blogs`,
                status : 'success'
            })
            setBlogs(blogs.concat(postedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setVisible(false)
        }catch(error){
            setNotification({
                message : 'failed to add the new blog please try again and make sure you provide the title and the url',
                status : 'failure'
            })
        }
        setTimeout(() => {
            setNotification(null)
        },4000)
    }
    if(!visible){
        return <button type="button" onClick={() => setVisible(true)} style={{ marginLeft:'1rem' }}>Add New Blog</button>
    }
    const hide = () => {
        setVisible(false)
    }
    return (
        <form onSubmit={handleCreate} style={{ display: visible ? 'block': 'none' }}>
            <h2>Create new blog : </h2>
            <div className='create-form'>
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' value={title} onChange={(event) => setTitle(event.target.value)} />
                <label htmlFor='author'>Author:</label>
                <input type='text' id='author' value={author} onChange={(event) => setAuthor(event.target.value)} />
                <label htmlFor='url'>Url:</label>
                <input type='text' id='url' value={url} onChange={(event) => setUrl(event.target.value)} />
                <button type='submit'>Create</button>
                <button type='button'  onClick={hide}>Cancel</button>
            </div>
        </form>
    )

}
export default CreateBlog