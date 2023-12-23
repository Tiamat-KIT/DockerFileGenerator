'use client';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import ViewDockerFile from './ViewDockerfileResult';

export type SubmitDataType = {
  OS: 'ubuntu' | null | symbol;
  Lang: 'TypeScript' | 'Rust' | null | symbol;
  FrameWork: 'Next.js' | null | symbol;
  PackageManager: 'npm' | 'yarn' | 'bun' | 'cargo' | symbol | null;
};

function Form({
  setProperty,
}: {
  setProperty: Dispatch<SetStateAction<SubmitDataType | undefined>>;
}) {
  const OSRef = useRef<SubmitDataType['OS']>('ubuntu');
  const LangRef = useRef<SubmitDataType['Lang']>('TypeScript');
  const FrameWorkRef = useRef<SubmitDataType['FrameWork']>('Next.js');
  const PackageManagerRef = useRef<SubmitDataType['PackageManager']>('npm');
  const RefLists = [OSRef, LangRef, FrameWorkRef, PackageManagerRef];

  type Selector = {
    LabelText: string;
    SelectItem: string[];
  };
  const SelectOS: Selector = {
    LabelText: 'Select OS',
    SelectItem: ['Ubuntu'],
  };
  const SelectLangs: Selector = {
    LabelText: 'Select Develop Language',
    SelectItem: ['Rust', 'TypeScript'],
  };
  const SelectFrameWork: Selector = {
    LabelText: 'Select Use FrameWork',
    SelectItem: ['Next.js'],
  };
  const SelectPackageManager: Selector = {
    LabelText: 'Use Package Manager',
    SelectItem: ['npm', 'yarn', 'bun'],
  };

  const SelectorComp = ({
    Genre,
    SelectorObj,
    Ref,
  }: {
    Genre: string;
    SelectorObj: Selector;
    Ref: any;
  }) => {
    return (
      <>
        <label className="label">
          <span className="label-text">{SelectorObj.LabelText}</span>
        </label>
        <select className="select" name={Genre} ref={Ref}>
          {SelectorObj.SelectItem.map((item, index) => {
            return (
              <option key={index} id={`${Genre}-${item}`} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  return (
    <>
      <form
        className="form-control w-full max-w-xs flex flex-row"
        action={
          (/* formData: FormData */) => {
            /* const SelectOS = formData.get('OS') as string;
          const SelectLang = formData.get('LG') as string;
          const SelectFrameWork = formData.get('FW') as string;
          const SelectPackagemanager = formData.get('PM') as string; */
            const Result: SubmitDataType = {
              OS: OSRef.current,
              Lang: LangRef.current,
              FrameWork: FrameWorkRef.current,
              PackageManager: PackageManagerRef.current,
            };
            setProperty(Result);
          }
        }
      >
        {[SelectOS, SelectLangs, SelectFrameWork, SelectPackageManager].map(
          (SelectorItem, index) => {
            const Genres = ['OS', 'LG', 'FW', 'PM'];
            return (
              <span key={index} className="pr-5">
                <SelectorComp
                  SelectorObj={SelectorItem}
                  Genre={Genres[index]}
                  Ref={RefLists[index]}
                />
              </span>
            );
          }
        )}
        <input type="submit" className="btn" value="生成" />
      </form>
    </>
  );
}
export default function ReturnData() {
  const [Property, setProperty] = useState<SubmitDataType | undefined>({
    OS: 'ubuntu',
    Lang: 'Rust',
    FrameWork: null,
    PackageManager: 'cargo',
  });
  return useMemo(() => {
    return (
      <>
        <Form setProperty={setProperty} />
        <ViewDockerFile Datus={Property as SubmitDataType} />
      </>
    );
  }, [
    Property!.OS,
    Property!.Lang,
    Property!.FrameWork,
    Property!.PackageManager,
  ]);
}
