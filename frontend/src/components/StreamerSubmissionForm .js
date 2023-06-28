import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

const StreamerSubmissionForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async(data) => {
        console.log("dataaa", data)

        await axios.post('http://localhost:4000/streamers', {
            ...data,
            image: `https://picsum.photos/200/300?random=${Math.floor(Math.random()*1000)+1}`
        })
            .then(response => {
                console.log("response:", response)
            })
            .catch(err => console.log("err:", err))
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
                        {...register("name")}
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                    />
                </label>

                <label className="block mb-2">
                    Streaming Platform:
                    <select
                        defaultValue=""
                        {...register("platform")}
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

                <label className="block mb-2">
                    Description:
                    <textarea
                        defaultValue=""
                        {...register("description")}
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                    ></textarea>
                </label>

                {errors.streamerName && (
                    <span className="text-red-500">Streamer's Name is required</span>
                )}

                {errors.platform && (
                    <span className="text-red-500">Please select a streaming platform</span>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default StreamerSubmissionForm 