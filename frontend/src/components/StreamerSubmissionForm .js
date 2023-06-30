import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { postStream } from '../redux/streamSlice'

const StreamerSubmissionForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        dispatch(postStream({
            ...data,
            image: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000) + 1}`
        }))
        reset()
    }

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Streamer Submission Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <label className="block mb-2">
                    Streamer's Name:
                    <input
                        type="text"
                        defaultValue=""
                        {...register("name", { 
                            required: "Streamer's Name is required" 
                        })}
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                    />
                </label>
                {errors.name && (
                    <span className="text-red-500">Streamer's Name is required</span>
                )}

                <label className="block mb-2">
                    Streaming Platform:
                    <select
                        defaultValue=""
                        {...register("platform", { 
                            required: "Please select a streaming platform"
                        })}
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                    >
                        <option value="">Select a platform</option>
                        <option value="Twitch">Twitch</option>
                        <option value="YouTube">YouTube</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Kick">Kick</option>
                        <option value="Rumble">Rumble</option>
                    </select>
                </label>
                {errors.platform && (
                    <span className="text-red-500">Please select a streaming platform</span>
                )}

                <label className="block mb-2">
                    Description:
                    <textarea
                        defaultValue=""
                        {...register("description")}
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                    ></textarea>
                </label>

                <div className="flex flex-col md:flex-row md:justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default StreamerSubmissionForm 