
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import {Button} from "@chakra-ui/react";

const MarkdownPost = ({setHtml,html}) => {

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange\n',"html:\n", html,"\ntext:\n", text);
        setHtml(html);
    }

    const handleSubmit = () => {
        console.log(html)
    }

    return ( 
        <>
        <MdEditor
                style={{ height: '300px', width:'50%'}}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        <Button colorScheme='blue' onClick={handleSubmit}>Add post</Button>
        </>
                                        
     );
}
 
export default MarkdownPost;