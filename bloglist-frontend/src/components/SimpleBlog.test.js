import '@testing-library/jest-dom/extend-expect'
import { render,cleanup,fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import React from 'react'
afterEach(cleanup)
const blog = {
    title : 'Modernism',
    author : 'Nasser',
    likes : 5
}
test('Simple blog renders the title and the author and number of likes',() => {
    const mockHandler = jest.fn()
    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const titleAuthorBox = component.container.querySelector('.title-author-box')
    expect(titleAuthorBox).toHaveTextContent('Modernism Nasser')
    const likesBox = component.container.querySelector('.likes-box')
    expect(likesBox).toHaveTextContent('blog has 5 likes')
})
test('Clicking the button twice',() => {
    const mockHandler = jest.fn()
    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})