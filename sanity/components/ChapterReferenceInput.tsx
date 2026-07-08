"use client";

// sanity/components/ChapterReferenceInput.tsx
import React, { useEffect, useState } from 'react'
import { Card, Stack, Text, Select, Spinner, Label, Box } from '@sanity/ui'
import { client } from '../lib/client'

interface ChapterReferenceInputProps {
  value: any
  onChange: (value: any) => void
  document: any
}

export function ChapterReferenceInput({ value, onChange, document }: ChapterReferenceInputProps) {
  const [chapters, setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChapters() {
      if (!document?.subject?._ref) {
        setLoading(false)
        return
      }

      try {
        // Get current subject details
        const subjectData = await client.fetch(`
          *[_id == $subjectId][0] {
            name,
            grade-> {
              level,
              title,
              board-> {
                name
              }
            }
          }
        `, { subjectId: document.subject._ref })

        if (subjectData?.grade) {
          const currentLevel = subjectData.grade.level
          
          // Define grade range
          const lowerGrade = Math.max(1, currentLevel - 2)
          const upperGrade = Math.min(12, currentLevel + 2)

          // Fetch chapters from other grades
          const chaptersData = await client.fetch(`
            *[_type == "chapter" && 
              subject->name == $subjectName && 
              subject->grade->level >= $lowerGrade &&
              subject->grade->level <= $upperGrade &&
              _id != $currentId
            ] | order(subject->grade->level asc, order asc) {
              _id,
              title,
              chapterNumber,
              "gradeLevel": subject->grade->level,
              "gradeTitle": subject->grade->title,
              "board": subject->grade->board->name
            }
          `, {
            subjectName: subjectData.name,
            lowerGrade,
            upperGrade,
            currentId: document._id
          })

          setChapters(chaptersData)
        }
      } catch (error) {
        console.error('Error fetching chapters:', error)
      }
      setLoading(false)
    }

    fetchChapters()
  }, [document?.subject?._ref, document?._id])

  if (loading) {
    return (
      <Card padding={4}>
        <Stack space={3}>
          <Spinner />
          <Text size={1}>Loading available chapters...</Text>
        </Stack>
      </Card>
    )
  }

  return (
    <Card padding={4} border>
      <Stack space={4}>
        <Label>Reference Existing Chapter</Label>
        
        {chapters.length === 0 ? (
          <Text size={1}>No chapters available to reference</Text>
        ) : (
          <Select
            value={value?._ref || ''}
            onChange={(e) => {
              const selected = chapters.find(ch => ch._id === e.target.value)
              onChange(selected ? { _ref: selected._id } : null)
            }}
          >
            <option value="">Select a chapter to reference...</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                Grade {chapter.gradeLevel} | {chapter.board} | 
                {chapter.chapterNumber ? ` Ch ${chapter.chapterNumber}:` : ''} {chapter.title}
              </option>
            ))}
          </Select>
        )}
        
        <Text size={0} muted>
          Showing chapters from 2 grades above and below current grade
        </Text>
      </Stack>
    </Card>
  )
}