import { chatFiles } from "./ChatFiles";
import { chatSequences } from "./ChatSequences";

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
        (it) => it.Command === "NineMessage" || it.Command === "NinePicture"
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
              Text: messageItem.Text,
              SpeakerIds: messageItem.SpeakerIds,
            };
          } else {
            return {
              Text: com.ParameterValues[10],
              SpeakerIds: [com.ParameterValues[9]],
            };
          }
        }),
        title: listItem?.name.en ?? "Group Chat",
        descrip: listItem?.description.en ?? "For casual chat.",
      });
    }
    return [...tempArr];
  })
  .flat();
