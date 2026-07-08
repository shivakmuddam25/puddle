// sanity/structure.ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Hierarchical View: Board → Grade → Subject → Chapter
      S.listItem()
        .title('📚 Course Structure (Hierarchical)')
        .icon(() => '🏛️')
        .child(
          S.documentTypeList('board')
            .title('Boards')
            .child((boardId) =>
              S.list()
                .title('Board Content')
                .items([
                  S.listItem()
                    .title('📖 Grades')
                    .icon(() => '📚')
                    .child(
                      S.documentList()
                        .title('Grades')
                        .filter('_type == "grade" && board._ref == $boardId && isActive == true')
                        .params({ boardId })
                        .child((gradeId) =>
                          S.list()
                            .title('Grade Content')
                            .items([
                              S.listItem()
                                .title('📘 Subjects')
                                .icon(() => '📖')
                                .child(
                                  S.documentList()
                                    .title('Subjects')
                                    .filter('_type == "subject" && grade._ref == $gradeId && isActive == true')
                                    .params({ gradeId })
                                    .child((subjectId) =>
                                      S.list()
                                        .title('Subject Content')
                                        .items([
                                          S.listItem()
                                            .title('📑 Chapters')
                                            .icon(() => '📑')
                                            .child(
                                              S.documentList()
                                                .title('Chapters')
                                                .filter('_type == "chapter" && subject._ref == $subjectId && isActive == true')
                                                .params({ subjectId })
                                            ),
                                        ])
                                    )
                                ),
                            ])
                        )
                    ),
                ])
            )
        ),
      
      S.divider(),
      
      // Direct Access (for quick editing)
      S.listItem()
        .title('📋 Direct Access')
        .icon(() => '⚡')
        .child(
          S.list()
            .title('Quick Access')
            .items([
              S.listItem()
                .title('Boards')
                .child(S.documentTypeList('board').title('All Boards')),
              S.listItem()
                .title('Grades')
                .child(S.documentTypeList('grade').title('All Grades')),
              S.listItem()
                .title('Subjects')
                .child(S.documentTypeList('subject').title('All Subjects')),
              S.listItem()
                .title('Chapters')
                .child(S.documentTypeList('chapter').title('All Chapters')),
            ])
        ),
      
      S.divider(),
      
      // Reference Reports
      S.listItem()
        .title('🔗 Chapter References')
        .icon(() => '🔗')
        .child(
          S.list()
            .title('Reference Reports')
            .items([
              S.listItem()
                .title('Chapters Being Referenced')
                .child(
                  S.documentList()
                    .title('Referenced Chapters')
                    .filter('_type == "chapter" && contentType == "new" && count(*[_type == "chapter" && referenceChapter._ref == ^._id]) > 0')
                ),
              S.listItem()
                .title('Chapters with References')
                .child(
                  S.documentList()
                    .title('Reference Chapters')
                    .filter('_type == "chapter" && contentType == "reference"')
                ),
            ])
        ),
      
      S.divider(),
      
      // Media & Resources
      S.listItem()
        .title('🎬 Media & Resources')
        .icon(() => '🎬')
        .child(
          S.list()
            .title('Resources')
            .items([
              S.listItem()
                .title('Media Library')
                .child(S.documentTypeList('mediaObject').title('Media Library')),
              S.listItem()
                .title('Math Formulas')
                .child(S.documentTypeList('mathFormula').title('Math Formulas')),
              S.listItem()
                .title('Chemical Formulas')
                .child(S.documentTypeList('chemicalFormula').title('Chemical Formulas')),
            ])
        ),
    ])