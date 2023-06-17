'use client';
import { useState, useEffect } from 'react';
import { Router } from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';


import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptId) return alert('Prompt not found');

        try {
            const response = await fetch(`api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }

    const {data: session } = useSession();
  if(!session?.user){
    return (
      <h1>Please sign in first</h1>
    )
  }


  return (
    <Form 
        type = "Edit"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {updatePrompt}
    />
  )
}

export default EditPrompt