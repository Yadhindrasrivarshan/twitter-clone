import { ArrowLeftIcon } from '@heroicons/react/solid'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modelAtom'
import Comment from '../components/Comment'
import Login from '../components/Login'
import Modal from '../components/Modal'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import Widget from '../components/WIdget'
import { db } from '../firebase'

const PostPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const { id } = router.query

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  //   if (!session) {
  //     return <Login providers={providers} />
  //   }
  return (
    <div className="text-white">
      <div className="">
        <main className="mx-auto flex  min-h-screen max-w-[1500px] bg-black">
          <Sidebar />
          <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
            <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-r border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
              <div
                className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
                onClick={() => router.push('/')}
              >
                <ArrowLeftIcon className="h-5 text-white" />
              </div>
              Tweet
            </div>
            <Post id={id} post={post} postPage={true} />
            {comments.length > 0 && (
              <div className="pb-72">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </div>
            )}
          </div>
          {isOpen && <Modal />}
          <Widget
            trendingResults={trendingResults}
            followResults={followResults}
          />
        </main>
      </div>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
