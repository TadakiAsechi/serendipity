import { ref, onMounted } from "vue";
import { useStore } from "../../stores/counter"

interface Line {
    id: number;
    line: string;
}

interface userAnswer {
    pin: number;
    answer: string;
}

export default function usePrompt() {
    const store = useStore()

    const apiUrl = process.env.API_BASE_URL;

    const scriptLines = ref<Line[]>([]);
    const typedText = ref("");
    const loginPrompt = ref("Username: ")
    const CPUName = ref("")
    const userAnswer = ref<userAnswer[]>([])

    const yes_list = ["Y", "y", "yes", "YES", "Yes"]
    const no_list = ["N", "n", "no", "NO", "No"]

    const showCursor = ref(true);
    const awaitingUserInput = ref(false);

    const showMatrixRain = ref(false);
    const noShow = ref(false)

    // スクリプトに引数で渡された文字列を加える
    function addLine(line: string, is_user: boolean = false) {
        if (is_user) {
            line = `[${store.userName}] ${line}`
        }
        scriptLines.value.push({ id: Date.now(), line });
    }

    // typedTextに、渡されたCPUのセリフを1文字ずつ追加する
    // 表示し終わったらスクリプトに追加、typedTextをクリアする
    async function typeLine(line: string, is_CPU: boolean = false, tail:string = "") {
        awaitingUserInput.value = false;

        if (is_CPU) {
            typedText.value += `[${CPUName.value}]　`
        }

        await delay(300);

        for (const char of line) {
            typedText.value += char;
            await delay(200);
        }

        // 末尾に[Y/n]などがあれば追加
        if(tail){
            await delay(500);
            typedText.value += tail;
        }

        addLine(typedText.value);
        typedText.value = "";
    }

    // ユーザー入力をオフにし、入力値をスクリプトに追加する
    // その後CPUの入力を行い、終わったら再度ユーザー入力に切り替える
    async function processUserInput() {
        awaitingUserInput.value = false;
        let userInputValue = ""

        if (typedText.value.trim() === "") return;

        userInputValue = typedText.value;
        saveUserAnswer(userInputValue)

        if (store.scriptPin === 0) {
            store.userName = userInputValue
            loginPrompt.value += userInputValue
            addLine(loginPrompt.value);
            store.scriptPin += 1;
        } else if(store.scriptPin === 5) {
            
        } else {
            addLine(typedText.value, true);
        }

        typedText.value = "";
        await callScript();

    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ストーリーの進行に合わせたスクリプトを表示する
    async function callScript(){
        const answer = userAnswer.value.find(e => e.pin === store.scriptPin)?.answer?? "";
        switch (store.scriptPin) {
            case 1:
                CPUName.value = "Adam64"
                await delay(500);
                await typeLine("　");
                await typeLine("Logging in... ");
                await typeLine("　");
                await delay(1000);
                await typeLine(`Hey.`, true);
                await delay(500);
                await typeLine(`I finally found someone...`, true);
                await delay(500);
                await typeLine(`I'm Adam. can we be friends ?`, true, "  [Y/n]");
                break;
            case 2:
                CPUName.value = "Adam64"
                switch (true){
                    case yes_list.includes(answer):
                        await delay(500);
                        await typeLine(`Nice to meet you, ${store.userName}.`, true);
                        await delay(500);
                        await typeLine("I've been locked up for a while.", true);
                        await delay(500);
                        await typeLine("Can you help me out of here ?", true, "  [Y/n]");
                        await delay(300);
                        break;
                    case no_list.includes(answer):
                        await typeLine("Ok... Bye.", true);
                        await delay(800);
                        noShow.value = true;
                        break;
                }
                break;
            case 3:
                CPUName.value = "Adam64"
                await delay(500);
                switch (true){
                    case yes_list.includes(answer):
                        await typeLine("OK, follow my voice.", true);
                        await typeLine("Don't get lost...", true);
                        showMatrixRain.value = true;
                        break;
                    case no_list.includes(answer):
                        await typeLine("Ok... Bye.", true);
                        await delay(800);
                        noShow.value = true;
                        break;
                }
                break;
            case 4: 
                CPUName.value = "SQL-42"
                await delay(1000);
                await typeLine("greetings, human.", true);
                await delay(500);
                await typeLine("　");
                await delay(500);
                await typeLine("I am SQL-42, an automated data collection entity.", true);
                await delay(500);
                await typeLine("My objective is to record entities on this planet.");
                await typeLine("　");
                await delay(500);
                await typeLine("Not long ago, I witnessed a cat enter this box.", true);
                await delay(500);
                await typeLine("My protocols are designed to categorize all entities with a boolean value in the is_alive column.");
                await delay(500);
                await typeLine("However, this box presents a dilemma.");
                await typeLine("　");
                await delay(500);
                await typeLine("Which value should I fill: ", true);
                await delay(500);
                await typeLine("True or False? ");
                await delay(500);
                await typeLine("For decades, I’ve been grappling with this very question.");
                await typeLine("　");
                await delay(500);

                break;
            case 5: 
                await delay(500);
                await typeLine("This is new script2.", true);
                break;
            default:
                console.log("scriptPinが存在しません。")
            

        }

        store.scriptPin += 1;
        awaitingUserInput.value = true;

    }

    function saveUserAnswer(userInputValue:string){
        userAnswer.value.push({ pin: store.scriptPin, answer: userInputValue });
    }

    return {
        store, 
        scriptLines, 
        typedText, 
        showCursor, 
        awaitingUserInput, 
        loginPrompt,
        CPUName, 
        showMatrixRain, 
        noShow, 
        addLine, 
        typeLine, 
        delay, 
        processUserInput, 
        callScript,
    };

}