'use client';
import { RefObject, useCallback, useRef, useState} from 'react';
import ViewDockerFile from './ViewDockerfileResult';
import { SubmitDataType } from '@/type/SubmitData';
import { SelectOS, SelectLangs, SelectFrameWork, SelectPackageManager, Selector } from '@/type/SubmitContent';


export function Form() {
  const [Property, setProperty] = useState<SubmitDataType>({
    OS: 'ubuntu',
    Lang: 'Rust',
    FrameWork: "Next.js",
    PackageManager: 'cargo',
  });
  const OSRef = useRef<HTMLSelectElement>(null);
  const LangRef = useRef<HTMLSelectElement>(null);
  const FrameWorkRef = useRef<HTMLSelectElement>(null);
  const PackageManagerRef = useRef<HTMLSelectElement>(null);
  const RefLists = [OSRef, LangRef, FrameWorkRef, PackageManagerRef];

  const SelectorComp = useCallback(({
    Genre,
    SelectorObj,
    Ref
  }: {
    Genre: string;
    SelectorObj: Selector;
    Ref: RefObject<HTMLSelectElement>
  }) => {
    const OptionElems  = SelectorObj.SelectItem.map((item, index) => {
      return (
        <option key={index} id={`${Genre}-${item}`} value={item}>
          {item}
        </option>
      )
    })
    return (
      <>
        <label className="label">
          <span className="label-text">{SelectorObj.LabelText}</span>
        </label>
        <select className="select" name={Genre} ref={Ref}>
          {OptionElems.map((elem) => {return elem})}
        </select>
      </>
    );
  },[])

  return (
    <>
      <form
        className="form-control w-full max-w-xs flex flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          const Result: SubmitDataType = {
            OS: OSRef.current?.value as SubmitDataType["OS"],
            Lang: LangRef.current?.value as SubmitDataType["Lang"],
            FrameWork: FrameWorkRef.current?.value as SubmitDataType["FrameWork"],
            PackageManager: PackageManagerRef.current?.value as SubmitDataType["PackageManager"],
          };
          setProperty(Result);
        }}
      >
        {[SelectOS, SelectLangs, SelectFrameWork, SelectPackageManager].map(
          (SelectorItem, index) => {
            const Genres = ['OS', 'LG', 'FW', 'PM'];
            return (
              <span key={index} className="pr-5">
                <SelectorComp
                  SelectorObj={SelectorItem}
                  Genre={Genres[index]}
                  Ref={RefLists[index]}/>
              </span>
            );
          }
        )}
        <input type="submit" className="btn" value="生成" />
      </form>
      <ViewDockerFile Datus={Property as SubmitDataType} />
    </>
  );
}
