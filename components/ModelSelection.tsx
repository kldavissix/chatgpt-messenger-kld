"use client"
import useSWR from "swr"
import Select from "react-select"
import { useEffect } from "react"

type ModelOptions = {
  value: string
  label: string
}

const fetchModels = () => fetch("/api/getModels").then((res) => res.json())

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels)
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo-1106",
  })

  const gptModels = models?.modelOptions.filter((model: ModelOptions) =>
    model.value.startsWith("gpt")
  )

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={gptModels}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#434654",
            backgroundColor: "#434654",
          }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
            fontSize: "small",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
            fontSize: "small",
          }),
          menuList: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
            fontSize: "small",
            borderColor: "#434654",
            backgroundColor: "#434654",
          }),
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}

export default ModelSelection
