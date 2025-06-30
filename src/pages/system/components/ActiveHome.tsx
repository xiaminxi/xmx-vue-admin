import { useState } from "@/hook/useState"
import { ref } from "vue"
import { Button } from "ant-design-vue"



const ActiveHome = (props: { index: number }) => {
    const [totalClick, setTotalClick] = useState(0)
    const count = ref(0)
    const buttonClick = () => {
        count.value++
    }
    return <div>
        <p>这是JSX组件{props.index}</p>
        <p>这是VUE变量{count.value}</p>
        <p>这是模仿react的useState变量{totalClick.value}</p>
        <Button onClick={buttonClick}>点击</Button>
        <Button type='primary' onClick={() => {
            setTotalClick((totalClick.value)! + 1)
        }}>模仿</Button>
    </div>
}

export default ActiveHome