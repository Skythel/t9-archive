import { chatFiles } from "./ChatFiles";
import { chatSequences } from "./ChatSequences";
import { speakerList } from "./ChatSpeakers";

const nineList = require("./nine_en/nine_list_item.json");
const nineSequence = require("./nine_en/nine_sequence.json");

export const chatList = chatSequences
  .map((c) => {
    const tempArr = [];
    for (let i = 1; i <= c.count; i++) {
      // Find if a chat exists
      const sequenceRecord =
        nineSequence.find((n) =>
          n.scriptable_object_path.includes(
            `${c.name}_${i.toString().padStart(2, 0)}`
          )
        ) ?? undefined;
      if (sequenceRecord === undefined) {
        console.log(`Unable to find sequence record for ${c.name} ${i}.`);
        continue;
      }

      // Get the description, title, and icon
      const listItem = sequenceRecord
        ? nineList.find((it) => it.id === sequenceRecord.id)
        : undefined;

      // Get the message content
      const logItem =
        chatFiles.find((m) => m.m_Name === `likabilityNINE_${c.name}_en`) ??
        undefined;
      if (logItem === undefined) {
        console.log(`Unable to find message log for ${c.name} ${i}.`);
        continue;
      }

      // Get the text ids used in this chat
      let sequenceItem;
      try {
        sequenceItem = require(`./nine_sequences/likabilityNINE_${c.name}_${i
          .toString()
          .padStart(2, 0)}.json`);
      } catch (e) {
        console.log(`Error importing ${c.name} ${i}`);
        continue;
      }
      const commandList = sequenceItem.CommandData.filter(
        (it) =>
          it.Command === "NineMessage" ||
          it.Command === "NinePicture" ||
          it.Command === "NineTypingAnimation"
      );

      tempArr.push({
        m_Name: logItem.m_Name,
        Speakers: logItem.Speakers,
        Contents: commandList.map((com) => {
          if (com.Command === "NineMessage") {
            const messageItem = logItem.Contents.find(
              (f) => f.TextId === com.ParameterValues[9]
            );
            return {
              Guid: com.Guid,
              Text: messageItem.Text,
              SpeakerId: com.ParameterValues[8],
              SpeakerData: speakerList.find(
                (s) => s.speakerId === Number(com.ParameterValues[8])
              ),
              WaitTriggerName: com.ParameterValues[1],
              InvokeTriggerName: com.ParameterValues[3],
              DelaySec: com.ParameterValues[5],
              TypingDuration: com.ParameterValues[6]
                ? com.ParameterValues[7]
                : 1.5,
              Type: "Message",
            };
          } else if (com.Command === "NinePicture") {
            return {
              Guid: com.Guid,
              Text: com.ParameterValues[10],
              SpeakerId: com.ParameterValues[8],
              SpeakerData: speakerList.find(
                (s) => s.speakerId === Number(com.ParameterValues[8])
              ),
              WaitTriggerName: com.ParameterValues[1],
              InvokeTriggerName: com.ParameterValues[3],
              DelaySec: com.ParameterValues[5],
              TypingDuration: com.ParameterValues[6]
                ? com.ParameterValues[7]
                : 1.5,
              Type: "Sticker",
            };
          } else if (com.Command === "NineTypingAnimation") {
            return {
              Guid: com.Guid,
              Text: "",
              SpeakerId: com.ParameterValues[4],
              SpeakerData: speakerList.find(
                (s) => s.speakerId === Number(com.ParameterValues[4])
              ),
              WaitTriggerName: com.ParameterValues[1],
              InvokeTriggerName: "",
              DelaySec: com.ParameterValues[3],
              TypingDuration: com.ParameterValues[6],
              Type: "Typing",
            };
          } else {
            return {};
          }
        }),
        title: listItem?.name.en ?? "Group Chat",
        descrip: listItem?.description.en ?? "For casual chat.",
      });
    }
    return [...tempArr];
  })
  .flat();
