<template>
    <div
        class="w-full md:w-1/2 rounded p-1 bg-black flex flex-row justify-center outline-blue-500 font-basic text-xl md:text-3xl"
        :placeholder="placeholder"
        contenteditable
        @input="handleInput"
    />
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
defineProps({
    placeholder: {
        type: String,
        default: 'Zadaj hodnotu',
    },
})
const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple']
    return colors[Math.floor(Math.random() * colors.length)]
}
const handleInput = (event: Event) => {
    const element = event.target as HTMLDivElement
    const text = element.innerText
    const arr = text.split('')
    if ((event as InputEvent).inputType === 'deleteContentBackward') arr.pop()

    element.innerHTML = arr
        .map(
            (char) =>
                `<span class="text-${getRandomColor()}-500">${char}</span>`
        )
        .join('')
    element.focus() // select all the content in the element
    const sel = window.getSelection()!
    sel.selectAllChildren(element)
    sel.collapseToEnd()
    emit('change', text.replace(/\n/g, ''))
}
</script>

<style scoped>
[contentEditable]:empty:not(:focus):before {
    content: attr(placeholder);
    color: #ccc;
}
</style>
