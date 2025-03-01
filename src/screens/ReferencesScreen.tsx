import {Box, Stack, Switch} from "@mui/material";
import {NavigableList} from "../navigation/NavigableList";
import {useGetSection, useGetSections} from "../dataAccess/workerApi/useGetSections";
import {useCallback, useEffect, useMemo, useState} from "react";
import {TextInput} from "../inputs/TextInput";
import {useGetWorks} from "../dataAccess/workerApi/useGetWorks";

export const ReferencesScreen  = () => {
    const worksData = useGetWorks();
    const [selectedWorks, setSelectedWorks] = useState<string[]>([])
    const [cachedSections, setCachedSections] = useState<Map<string, {
        name: string;
        count: number;
        rank: number;
    }[]>>(new Map())

    const [filter, setFilter] = useState<string>("");

    const [show, setShow] = useState<boolean>(true)
    const works = Array.isArray(worksData.data) ? worksData.data : [];
    const filteredWorks = works.filter(work => work[1].toLowerCase().includes(filter.toLowerCase()));
    const getReferences = useGetReferences();
    const [references, setReferences] = useState<{
        name: string;
        count: number;
        rank: number;
    }[]>([])
    useEffect(() => {
        const fetch = async () => {
            for (const selectedWork of selectedWorks) {
                if (!cachedSections.has(selectedWork)) {
                    const references = await getReferences({work_id: selectedWork})
                    if (references) {
                        cachedSections.set(selectedWork, references)
                    }
                }
            }
            setCachedSections(cachedSections);

            const referenceMap = new Map<string, {
                name: string;
                count: number;
                rank: number;
            }>

            for (const [key, cachedSection] of Array.from(cachedSections.entries())) {
                if (!selectedWorks.includes(key)) {
                    continue
                }
                for (const reference of cachedSection) {

                    const existingReference = referenceMap.get(reference.name)
                    if (existingReference) {
                        referenceMap.set(reference.name, {
                            name: existingReference.name,
                            count: existingReference.count + reference.count,
                            rank: existingReference.rank + reference.rank,
                        });
                    } else {
                        referenceMap.set(reference.name, reference)
                    }
                }
            }

            setReferences(Array.from(referenceMap.values()).sort((a, b) => b.rank - a.rank))

        }
        void fetch();
    }, [selectedWorks])

    console.log(works)

    return <Box style={{width: '100%', height: 1000, paddingTop: 30, justifyItems: 'center', marginLeft: 'auto'}}>

        <Box>Show self: <Switch checked={show} onChange={() => setShow(!show)} /></Box>
        <Stack direction="row" spacing={1}>
            <Stack direction="column" spacing={1}>
                <TextInput onChange={setFilter} />
                <NavigableList items={filteredWorks.map(work => {
                    return {
                        name: work[1],
                        id: work[0],
                    }
                })} onClick={(item) => setSelectedWorks(prev => {
                    return prev.includes(item.id) ? prev.filter(prevItem => prevItem !== item.id) : [...prev, item.id]
                })} />
            </Stack>
            <Stack direction="column" spacing={1}>
                <Box>Selected</Box>
                <NavigableList items={selectedWorks.map(workId => {
                    return {
                        name: works.find(work => work[0] === workId)?.[1],
                        id: workId,
                    }
                })} onClick={(item) => setSelectedWorks(prev => {
                    return prev.includes(item.id) ? prev.filter(prevItem => prevItem !== item.id) : [...prev, item.id]
                })} />
            </Stack>
            <NavigableList items={references.map(reference => {
                return {
                    name: `${reference.rank} - ${reference.name} - ${reference.count}`,
                    id: reference.name,
                }
            })} onClick={() => null} />
        </Stack>
    </Box>

}

const useGetReferences = () => {
    const getSection = useGetSection();

    return useCallback(async ({work_id}:{work_id: string}) => {
        const sectionData: Array<Array<any>> =  await getSection({work_id})
        if (!Array.isArray(sectionData)) {
            return;
        }
        const referenceLists: string[] = sectionData?.map(section => section[4])
        const referenceMap: Map<string, {
            name: string;
            count: number;
            rank: number;
        }> = new Map()
        let max = 0
        for (const referenceList of referenceLists) {
            const references = referenceList?.split('\n') ?? []
            for (const reference of references) {
                if (reference.length === 0) {
                    continue
                }
                const existingReference = referenceMap.get(reference)
                if (existingReference) {
                    referenceMap.set(reference, {
                        name: reference,
                        count: existingReference.count + 1,
                        rank: 0
                    });
                    if (existingReference.count + 1 > max) {
                        max = existingReference.count + 1;
                    }
                } else {
                    referenceMap.set(reference, {
                        name: reference,
                        count: 1,
                        rank: 0
                    })
                    if (1 > max) {
                        max = 1
                    }
                }
            }
        }

        for (const key of Array.from(referenceMap.keys())) {
            const currentValue = referenceMap.get(key)
            if (currentValue) {
                referenceMap.set(key, {
                    ...currentValue,
                    rank: currentValue.count / max
                })
            }
        }

        return Array.from(referenceMap.values()).sort((a, b) => b.count - a.count)
    }, [])
}
