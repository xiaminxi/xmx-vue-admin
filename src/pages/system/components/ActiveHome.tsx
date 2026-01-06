import { useState } from "@/hook/useState"
import { ref } from "vue"
import { Button } from "ant-design-vue"


const count = ref(0)
const [totalClick, setTotalClick] = useState(0)
const ActiveHome = (props: { index: number }) => {

    const buttonClick = () => {
        count.value++
    }

    const reactButton = () => {
        setTotalClick(totalClick.value + 1)
    }
    return <div>
        <p>这是JSX组件{props.index}</p>
        <p>这是VUE变量{count.value}</p>
        <p>这是模仿react的useState变量{totalClick.value}</p>
        <Button onClick={buttonClick}>点击</Button>
        <Button type='primary' onClick={reactButton}>模仿</Button>
    </div>
}

export default ActiveHome